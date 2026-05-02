import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/locales/en.json";
import ja from "@/locales/ja.json";
import ko from "@/locales/ko.json";
import zh from "@/locales/zh.json";
import zhTW from "@/locales/zh-TW.json";

export const STORAGE_KEY = "language";

export const SUPPORTED_LANGUAGES = ["ko", "en", "ja", "zh", "zh-TW"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

i18n.use(initReactI18next).init({
  resources: {
    ko: { translation: ko },
    en: { translation: en },
    ja: { translation: ja },
    zh: { translation: zh },
    "zh-TW": { translation: zhTW },
  },
  lng: "ko",
  fallbackLng: "ko",
  interpolation: { escapeValue: false },
});

export async function loadSavedLanguage() {
  const saved = await AsyncStorage.getItem(STORAGE_KEY);
  if (saved && SUPPORTED_LANGUAGES.includes(saved as SupportedLanguage)) {
    await i18n.changeLanguage(saved);
  }
}

export async function changeLanguage(lang: SupportedLanguage) {
  await i18n.changeLanguage(lang);
  await AsyncStorage.setItem(STORAGE_KEY, lang);
}

export default i18n;
