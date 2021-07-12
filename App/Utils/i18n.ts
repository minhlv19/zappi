import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getDefaultLanguageCode } from './localize';
import { getStoredProperty } from './storage';

const languageDetector: any = {
  type: 'languageDetector',
  async: true,
  detect: (callback: any) => {
    getStoredProperty('languageCode').then(savedLanguageCode => {
      if (savedLanguageCode) {
        callback(savedLanguageCode);
      } else {
        callback(getDefaultLanguageCode());
      }
    });
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

const setupI18N = () => {
  i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: 'en',
      resources: {
        en: {
          common: require('./locales/en.json'),
        },
        th: {
          common: require('./locales/th.json'),
        },
      },
      ns: ['common'],
      defaultNS: 'common',
      debug: false,
      cache: {
        enabled: true,
      },
      interpolation: {
        escapeValue: false,
      },
      keySeparator: '->',
    });
};

export default setupI18N;
