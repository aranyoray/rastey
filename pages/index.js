import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';  // Ensure you're using this
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Map from '../components/Map';
import RatingSystem from '../components/RatingSystem';
import BusynessIndex from '../components/BusynessIndex';
import LanguageSelector from '../components/LanguageSelector';
import VoiceRecognition from '../components/VoiceRecognition';
import LandmarkAdder from '../components/LandmarkAdder';
import ComfortableTrailFinder from '../components/ComfortableTrailFinder';
import { changeLanguage } from '../utils/languageTranslator';  // Change language utility

export default function Home() {
  const { t } = useTranslation(); // Access translations
  const [language, setLanguage] = useState('en');
  const [darkMode, setDarkMode] = useState(false);
  const [mapType, setMapType] = useState('walkability');
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    changeLanguage(language);  // Update language in translation
  }, [language]);

  // Load Google Maps API script dynamically
  useEffect(() => {
    if (!mapLoaded) {
      const googleMapScript = document.createElement('script');
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places,directions`;
      googleMapScript.async = true;
      googleMapScript.defer = true;
      googleMapScript.onload = () => setMapLoaded(true);
      document.head.appendChild(googleMapScript);
    }
  }, [mapLoaded]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  return (
    <div className={`${styles.container} ${darkMode ? styles.darkMode : ''}`}>
      <Head>
        <title>{t('appName')} - {t('walkabilityRating')}</title>  {/* Ensure you're using translations */}
        <meta name="description" content={t('appDescription')} />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet" />
      </Head>

      <header className={styles.header}>
        <h1 className={styles.title}>{t('appName')} 🚶‍♂️</h1>  {/* Translated app name */}
        <LanguageSelector language={language} setLanguage={setLanguage} />
        <button className={styles.darkModeToggle} onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>

      <main className={styles.main}>
        <div className={styles.mapContainer}>
          {mapLoaded ? (
            <Map mapType={mapType} />
          ) : (
            <p>{t('loadingMap')}</p>
          )}
          <div className={styles.mapControls}>
            <button className={`btn ${mapType === 'walkability' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setMapType('walkability')}>
              🚶‍♂️ {t('walkability')}
            </button>
            <button className={`btn ${mapType === 'busyness' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setMapType('busyness')}>
              🚗 {t('busyness')}
            </button>
          </div>
        </div>

        <div className={styles.featuresContainer}>
          <div className={`card ${styles.featureCard}`}>
            <RatingSystem />
          </div>
          <div className={`card ${styles.featureCard}`}>
            <BusynessIndex />
          </div>
          <div className={`card ${styles.featureCard}`}>
            <LandmarkAdder />
          </div>
          <div className={`card ${styles.featureCard}`}>
            <ComfortableTrailFinder />
          </div>
        </div>

        <VoiceRecognition language={language} />
      </main>

      <footer className={styles.footer}>
        <p>{t('Made with ❤️ in India for Namma Bangalore.')}</p>
      </footer>
    </div>
  );
}