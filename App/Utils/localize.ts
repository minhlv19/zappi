import * as RNLocalize from 'react-native-localize';
import LocalizedStrings from 'react-native-localization';
import en from './locales/en.json';
import th from './locales/th.json';
import DataStorage from 'App/Utils/storage';
export const SUPPORTED_LANGUAGE_CODES = ['th', 'en'];

export const getDefaultLanguageCode = () => {
  const locales = RNLocalize.getLocales();
  if (locales && locales.length) {
    return SUPPORTED_LANGUAGE_CODES.includes(locales[0].languageCode) ? locales[0].languageCode : 'en';
  }
  return 'en';
};
export const getDefaultCountryCode = () => {
  const locales = RNLocalize.getLocales();
  if (locales && locales.length) {
    return locales[0].countryCode;
  }
  return 'en';
};
