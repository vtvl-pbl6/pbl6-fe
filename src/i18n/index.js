import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import vi from './locales/vi.json';

const resources = {
    en: { translation: en },
    vi: { translation: vi },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'vi',
        fallbackLng: 'vi',
        interpolation: {
            escapeValue: false,
        },
    });
    
i18n.on('languageChanged', (lng) => {
    localStorage.setItem('lang', lng);
});

const loadLanguageFromStorage = () => {
    try {
        const lang = localStorage.getItem('lang');
        if (lang) {
            i18n.changeLanguage(lang);
        }
    } catch (error) {
        console.error('Error loading language from storage', error);
    }
}
loadLanguageFromStorage();

export default i18n;
