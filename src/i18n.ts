import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './locales/en/translation.json';
import de from './locales/de/translation.json';

/*
const LANGUAGE_DETECTOR: LanguageDetectorModule  = {
  type: 'languageDetector',
  detect: () => {
    let language = 'en';
    AsyncStorage.getItem('user-language')
      .then(storedLanguage => {
        if (storedLanguage) {
          language = storedLanguage;
        } else {
          const locale = Platform.OS === 'ios'
            ? NativeModules.SettingsManager.settings.AppleLanguages[0]
            : NativeModules.I18nManager.localeIdentifier;
          language = locale ? locale.substring(0, 2) : 'en';
        }
      })
      .catch(() => {
        const locale = Platform.OS === 'ios'
          ? NativeModules.SettingsManager.settings.AppleLanguages[0]
          : NativeModules.I18nManager.localeIdentifier;
        language = locale ? locale.substring(0, 2) : 'en';
      });
    return language;
  },
  init: () => {
    // Initialization logic if needed
  },
  cacheUserLanguage: (language: string) => {
    AsyncStorage.setItem('user-language', language);
  },
};
*/
i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'de',
    resources: {en: {translation: en}, de: {translation: de}},
    interpolation: {
      escapeValue: false, // React already handles escaping
    },
  });
export default i18n;
