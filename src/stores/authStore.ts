import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken: string, keepLogin: boolean) => Promise<void>;
  clearTokens: () => Promise<void>;
  loadTokens: () => Promise<void>;
  saveEmail: (email: string) => Promise<void>;
  loadEmail: () => Promise<string | null>;
  clearEmail: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,

  setTokens: async (accessToken, refreshToken, keepLogin) => {
    if (keepLogin) {
      await SecureStore.setItemAsync("accessToken", accessToken);
      await SecureStore.setItemAsync("refreshToken", refreshToken);
    }
    set({ accessToken, refreshToken });
  },

  clearTokens: async () => {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
    set({ accessToken: null, refreshToken: null });
  },

  loadTokens: async () => {
    const accessToken = await SecureStore.getItemAsync("accessToken");
    const refreshToken = await SecureStore.getItemAsync("refreshToken");
    set({ accessToken, refreshToken });
  },

  saveEmail: async (email) => {
    await SecureStore.setItemAsync("savedEmail", email);
  },

  loadEmail: async () => {
    return await SecureStore.getItemAsync("savedEmail");
  },

  clearEmail: async () => {
    await SecureStore.deleteItemAsync("savedEmail");
  },
}));
