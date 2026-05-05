import client from "./client";

export const authApi = {
  // 이메일 인증번호 발송
  sendEmailVerification: (email: string) =>
    client.post<{ success: boolean; ttlSeconds: number }>(
      "/api/v1/auth/email-verifications/send",
      { email, sessionId: null },
    ),

  // 이메일 인증번호 확인
  verifyEmail: (email: string, code: string) =>
    client.post<{ success: boolean; verified: boolean }>(
      "/api/v1/auth/email-verifications/verify",
      { email, code, sessionId: null },
    ),

  // 회원가입
  signup: (data: {
    email: string;
    password: string;
    name: string;
    gender: "MALE" | "FEMALE";
    phoneNumber: string | null;
    birthDate: string;
    nationality: string;
    consents: { termsVersion: string; type: string; agreed: boolean }[];
  }) =>
    client.post<{
      identityId: string;
      profileId: string;
      profileCompleted: boolean;
      createdAt: string;
    }>("/api/v1/users/signup", { ...data, sessionId: null }),

  // 이메일 로그인
  loginEmail: (email: string, password: string, deviceFingerprint?: string) =>
    client.post<{
      accessToken: string;
      refreshToken: string;
      accessExpiresInSeconds: number;
      refreshExpiresInSeconds: number;
      profileCompleted: boolean;
      requiredConsentsCompleted: boolean;
    }>("/api/v1/auth/login/email", { email, password, deviceFingerprint: deviceFingerprint ?? null }),

  // 토큰 갱신
  refresh: (refreshToken: string, deviceFingerprint?: string) =>
    client.post<{
      accessToken: string;
      refreshToken: string;
      accessExpiresInSeconds: number;
      refreshExpiresInSeconds: number;
      profileCompleted: boolean;
      requiredConsentsCompleted: boolean;
    }>("/api/v1/auth/refresh", { refreshToken, deviceFingerprint: deviceFingerprint ?? null }),

  // 로그아웃
  logout: (refreshToken: string) =>
    client.post<{ success: boolean }>("/api/v1/auth/logout", { refreshToken }),

  // 비밀번호 재설정 코드 발송
  sendPasswordResetCode: (email: string) =>
    client.post<{ success: boolean; ttlSeconds: number }>(
      "/api/v1/auth/password-resets/send",
      { email },
    ),

  // 비밀번호 재설정 코드 검증
  verifyPasswordResetCode: (email: string, code: string) =>
    client.post<{ success: boolean }>(
      "/api/v1/auth/password-resets/verify",
      { email, code },
    ),

  // 비밀번호 재설정
  resetPassword: (email: string, newPassword: string) =>
    client.post<{ success: boolean }>(
      "/api/v1/auth/password-resets/reset",
      { email, newPassword },
    ),
};
