import { create } from "zustand";

type Gender = "MALE" | "FEMALE";
type ConsentType = "PRIVACY" | "SERVICE" | "MARKETING";

interface Consent {
  termsVersion: string;
  type: ConsentType;
  agreed: boolean;
}

interface SignupState {
  // 개인정보
  name: string;
  gender: Gender | null;
  phoneNumber: string;
  birthDate: string;
  nationality: string;

  // 이메일
  email: string;

  // 비밀번호
  password: string;

  // 약관
  consents: Consent[];

  // actions
  setPersonalInfo: (data: {
    name: string;
    gender: Gender;
    phoneNumber: string;
    birthDate: string;
    nationality: string;
  }) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConsents: (consents: Consent[]) => void;
  reset: () => void;
}

const initialState = {
  name: "",
  gender: null,
  phoneNumber: "",
  birthDate: "",
  nationality: "",
  email: "",
  password: "",
  consents: [],
};

export const useSignupStore = create<SignupState>((set) => ({
  ...initialState,

  setPersonalInfo: (data) => set(data),

  setEmail: (email) => set({ email }),

  setPassword: (password) => set({ password }),

  setConsents: (consents) => set({ consents }),

  reset: () => set(initialState),
}));
