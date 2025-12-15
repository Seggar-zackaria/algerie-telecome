import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import fr from './locales/fr.json';
import ar from './locales/ar.json';

i18n

  .use(LanguageDetector)
  .use(initReactI18next)
  
  .init({
    debug: true,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: en
      },
      fr: {
        translation: fr
      },
      ar: {
        translation: ar
      }
    }
  }, (err) => {
    if (err) return console.error('Error loading i18n:', err);
    // Initialize direction
    const currentLang = i18n.language;
    const dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = currentLang;
  });

export default i18n;
