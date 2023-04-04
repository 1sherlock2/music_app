import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18next
  .use(initReactI18next)
  // .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    debug: true,
    resources: {
      en: {
        translation: {
          browserBottom: 'Download content by paste to link from internet',
          changeLanguage: 'Change language',
          pasteLink: 'Paste the link',
          logout: 'Logout'
        }
      },
      ru: {
        translation: {
          browserBottom: 'Загрузите контент, вставив ссылку из интернета',
          changeLanguage: 'Изменить язык',
          pasteLink: 'Вставьте ссылку',
          logout: 'Выйти'
        }
      }
    }
  });
