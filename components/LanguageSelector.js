import React, { useEffect, useState } from 'react';
import { changeLanguage, getCurrentLanguage } from '../utils/languageTranslator';
import styles from '../styles/LanguageSelector.module.css';

const LanguageSelector = () => {
  const languages = [
    { code: 'en', name: 'languages.english', flag: '🇬🇧' },
    { code: 'hi', name: 'languages.hindi', flag: '🇮🇳' },
    { code: 'kn', name: 'languages.kannada', flag: '🇮🇳' }
  ];

  const [currentLanguage, setCurrentLanguage] = useState(getCurrentLanguage());

  const handleLanguageChange = async (e) => {
    const newLang = e.target.value;
    await changeLanguage(newLang);
    setCurrentLanguage(newLang);  // Ensure re-render after language change
  };

  return (
    <div className={styles.languageSelector}>
      <select
        value={currentLanguage}
        onChange={handleLanguageChange}
        className={styles.select}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;