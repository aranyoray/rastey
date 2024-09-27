// utils/languageTranslator.js

// Define your translations here
const translations = {
  en: {
    appName: "Rastey",
    walkabilityRating: "Walkability Rating",
    busynessIndex: "Busyness Index",
    addLandmark: "Add Landmark",
    comfortableTrail: "Comfortable Trail",
    streetName: "Street Name",
    submit: "Submit",
    findRoute: "Find Route",
    startLocation: "Start Location",
    endLocation: "End Location",
  },
  hi: {
    appName: "रास्ते",
    walkabilityRating: "चलने की रेटिंग",
    busynessIndex: "व्यस्तता सूचकांक",
    addLandmark: "लैंडमार्क जोड़ें",
    comfortableTrail: "आरामदायक मार्ग",
    streetName: "सड़क का नाम",
    submit: "जमा करें",
    findRoute: "मार्ग खोजें",
    startLocation: "प्रारंभिक स्थान",
    endLocation: "अंतिम स्थान",
  },
  kn: {
    appName: "ರಸ್ತೆ",
    walkabilityRating: "ನಡಿಗೆ ರೇಟಿಂಗ್",
    busynessIndex: "ವ್ಯಸ್ತತೆ ಸೂಚ್ಯಂಕ",
    addLandmark: "ಲ್ಯಾಂಡ್‌ಮಾರ್ಕ್ ಸೇರಿಸಿ",
    comfortableTrail: "ಆರಾಮದಾಯಕ ಮಾರ್ಗ",
    streetName: "ರಸ್ತೆಯ ಹೆಸರು",
    submit: "ಸಲ್ಲಿಸು",
    findRoute: "ಮಾರ್ಗ ಹುಡುಕಿ",
    startLocation: "ಪ್ರಾರಂಭ ಸ್ಥಳ",
    endLocation: "ಅಂತಿಮ ಸ್ಥಳ",
  },
};

let currentLanguage = "en"; // Default language

// Function to translate a key based on the current language
export const translate = (key) => {
  if (!translations[currentLanguage]) {
    console.warn(`Translation not found for language: ${currentLanguage}. Falling back to 'en'.`);
    currentLanguage = 'en'; // Fallback to English if the language is not found
  }
  return translations[currentLanguage][key] || key; // Fallback to key if translation not found
};

// Function to change the language
export const changeLanguage = (lang) => {
  if (translations[lang]) {
    currentLanguage = lang;
  } else {
    console.warn(`Language ${lang} not supported. Falling back to 'en'.`);
    currentLanguage = 'en';
  }
};

// Function to get the current language
export const getCurrentLanguage = () => currentLanguage;