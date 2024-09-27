// utils/language/Translator.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Import translations
import enTranslations from '../../public/locales/en/translation.json';
import hiTranslations from '../../public/locales/hi/translation.json';
import knTranslations from '../../public/locales/kn/translation.json';

// Initialize i18next
i18n
  .use(Backend) // For loading translations dynamically
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources: {
      en: { translation: enTranslations },
      hi: { translation: hiTranslations },
      kn: { translation: knTranslations },
    },
    fallbackLng: 'en', // Fallback language
    debug: process.env.NODE_ENV === 'development', // Enable debug in development
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

// Translation helper to translate text
export const translateText = (key, options = {}) => {
  return i18n.t(key, options);
};

// Function to change the language
export const changeLanguage = async (lang) => {
  await i18n.changeLanguage(lang);
};

// Function to get the current language
export const getCurrentLanguage = () => {
  return i18n.language;
};

export default i18n;