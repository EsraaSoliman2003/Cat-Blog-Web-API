import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en/translation.json";
import translationAR from "./locales/ar/translation.json";

const savedLang = localStorage.getItem("language") || "en";

i18n.use(initReactI18next).init({
  lng: savedLang,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  resources: {
    en: { translation: translationEN },
    ar: { translation: translationAR },
  },
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng);
});

export default i18n;
