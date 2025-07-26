import { create } from "zustand";

type Language = "en" | "bn";

interface LanguageState {
  language: Language;
  toggleLanguage: () => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: "bn",
  toggleLanguage: () =>
    set((state) => ({
      language: state.language === "bn" ? "en" : "bn",
    })),
}));
