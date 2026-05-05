import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useAuthStore } from "@/stores/authStore";

const client = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// 요청마다 accessToken 자동 첨부 (수동으로 이미 붙인 경우 덮어쓰지 않음)
client.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 동시에 여러 요청이 401 날 때 하나만 refresh 하고 나머지는 대기
let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void; reject: (err: unknown) => void }> = [];

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token!);
  });
  failedQueue = [];
};

// 401 응답 시 토큰 갱신 후 원래 요청 재시도
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // refresh 요청 자체가 실패하거나, 이미 재시도한 요청은 그냥 reject
    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      originalRequest._isRefresh
    ) {
      return Promise.reject(error);
    }

    // 이미 refresh 중이면 queue에 넣고 대기
    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return client(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const { refreshToken, setTokens, clearTokens } = useAuthStore.getState();

    try {
      if (!refreshToken) throw new Error("No refresh token");

      // SecureStore에 accessToken이 있으면 keepLogin=true 였던 것 (apolloClient와 동일 방식)
      const keepLogin = !!(await SecureStore.getItemAsync("accessToken").catch(() => null));

      const res = await client.post<{ accessToken: string; refreshToken: string }>(
        "/api/v1/auth/refresh",
        { refreshToken, deviceFingerprint: null },
        { _isRefresh: true } as any,
      );

      const { accessToken: newAccess, refreshToken: newRefresh } = res.data;
      await setTokens(newAccess, newRefresh, keepLogin);

      processQueue(null, newAccess);
      originalRequest.headers.Authorization = `Bearer ${newAccess}`;
      return client(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      await clearTokens();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default client;
