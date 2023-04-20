import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import translationVI from './app/assets/languages/locates/vi/translation'
// import LanguageDetector from 'i18next-browser-languagedetector';
const resources = {
    vi: {
        translation: translationVI,
    },
}

i18n.use(Backend)
    // .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'vi',
        debug: false,
        interpolation: {
            escapeValue: false,
        },
    })
export default i18n
