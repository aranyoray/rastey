import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../utils/languageTranslator';
import '../styles/globals.css'; // Ensures global styles are available throughout the app

function MyApp({ Component, pageProps }) {
  return (
    <I18nextProvider i18n={i18n}>
      <Component {...pageProps} />
    </I18nextProvider>
  );
}

export default MyApp;