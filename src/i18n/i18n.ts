import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";

i18n
  .use(initReactI18next)
  // .use(LanguageDetector)
  .init({
    // fallbackLng: "ja",
    lng: "en",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: { translation: en },
    },
  });

export default i18n;
