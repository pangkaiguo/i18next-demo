import store from 'store';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from './en.json';

const isProduction = process.env.NODE_ENV === 'production';

// 自定义解析
class CustomBackend {
  constructor(services, backendOptions = {}, i18nextOptions = {}) {
    this.init(services, backendOptions, i18nextOptions);
  }

  init(services, backendOptions, i18nextOptions) {
    // Validate backendOptions
    console.log(services, backendOptions, i18nextOptions)
  }

  // other required methods;
  // ie. read, create, etc.
}
CustomBackend.type = "backend";


const initReactI18n = () => {
  const currentLocale = store.get('LOCALE') || navigator.language || navigator.browserLanguage || navigator.userLanguage || 'zh-CN';
  const browserLanguage = currentLocale.split('-')[0];
  i18n
    .use(CustomBackend)
    // import LanguageDetector from 'i18next-browser-languagedetector';
    // .use(LanguageDetector) // get current browser default language
    .use(initReactI18next)
    .init({
      // the translations
      // (tip move them in a JSON file and import them,
      // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
      resources: {
        [browserLanguage]: {
          translation: browserLanguage === 'en' ? en : '',
        }
      },
      lng: browserLanguage, // if you're using a language detector, do not define the lng option
      fallbackLng: browserLanguage,
      debug: !isProduction,
      preload: true,
      saveMissing: !isProduction, // you should not use saveMissing in production
      interpolation: {
        escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        useRawValueToEscape: false,
      },
      react: {
        hashTransKey: function (defaultValue) {
          // return a key based on defaultValue or if you prefer to just remind you should set a key return false and throw an error
        },
        defaultTransParent: 'div', // a valid react element - required before react 16
        // https://react.i18next.com/latest/trans-component#trans-props
        transEmptyNodeValue: '', // what to return for empty Trans
        transSupportBasicHtmlNodes: true, // allow <br/> and simple html elements in translations
        transKeepBasicHtmlNodesFor: ['span', 'a'], // don't convert to <1></1> if simple react elements
        // Wrap text nodes in a user-specified element.
        // i.e. set it to 'span'. By default, text nodes are not wrapped.
        // Can be used to work around a well-known Google Translate issue with React apps. See: https://github.com/facebook/react/issues/11538
        // (v11.10.0)
        transWrapTextNodes: '',
      },
      backend: {
        test: 'test'
      }
    });
};

export { initReactI18n };