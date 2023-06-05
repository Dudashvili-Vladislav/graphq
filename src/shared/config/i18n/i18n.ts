import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import ruData from './locales/ru';
import enData from './locales/en';

const config = {
    debug: __IS_DEV__,
    fallbackLng: ['ru', 'en'],
    supportedLngs: ['ru', 'en'],

    interpolation: {
        escapeValue: false,
    },

    defaultNS: 'translation',

    resources: {
        ru: {
            ruData,
        },
        en: {
            enData,
        },
    },
};

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init(config);

export default i18n;