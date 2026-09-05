import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import hi from './hi.json';
import bn from './bn.json';

const savedLanguage = localStorage.getItem('karigar-language') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      bn: { translation: bn }
    },
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already protects from xss
    },
    react: {
      useSuspense: false
    }
  });

// Listen to language changes to ensure localStorage remains synchronized
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('karigar-language', lng);
  document.documentElement.lang = lng;
});

// Set initial html lang attribute
document.documentElement.lang = savedLanguage;

export default i18n;
