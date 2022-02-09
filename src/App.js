import logo from './logo.svg';
import './App.css';
import store from 'store';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import en from './locale/en.json';
import zh from './locale/zh.json';

const currentLocale = store.get('LOCALE') || navigator.language || navigator.browserLanguage || navigator.userLanguage || 'zh-CN';
const browserLanguage = currentLocale.split('-')[0];

i18n
  // import LanguageDetector from 'i18next-browser-languagedetector';
  // .use(LanguageDetector) // get current browser default language
  .use(initReactI18next)
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      [browserLanguage]: {
        translation: browserLanguage === 'en' ? en : zh,
      }
    },
    lng: browserLanguage, // if you're using a language detector, do not define the lng option
    fallbackLng: browserLanguage,
    debug: false,
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    react: {
      hashTransKey: function (defaultValue) {
        // return a key based on defaultValue or if you prefer to just remind you should set a key return false and throw an error
      },
      defaultTransParent: 'div', // a valid react element - required before react 16
      // https://react.i18next.com/latest/trans-component#trans-props
      transEmptyNodeValue: '', // what to return for empty Trans
      transSupportBasicHtmlNodes: true, // allow <br/> and simple html elements in translations
      transKeepBasicHtmlNodesFor: ['a', 'img', 'span'], // don't convert to <1></1> if simple react elements
      // Wrap text nodes in a user-specified element.
      // i.e. set it to 'span'. By default, text nodes are not wrapped.
      // Can be used to work around a well-known Google Translate issue with React apps. See: https://github.com/facebook/react/issues/11538
      // (v11.10.0)
      transWrapTextNodes: '',
    }
  });
function App() {
  const { t } = useTranslation();
  const context = Math.random().toFixed(2);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>{t('国际化 i18next {{0}}{{1}}{{2}}', { 0: context, 1: '100%', 2: 100 })}</div>
        <div>{
          t('测试标签 {{img}} {{a}} {{span}}', {
            img: <img src={logo} className="App-logo" alt="logo" />, 'a': <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>, span: <span>transWrapTextNodes</span>
          })}
        </div>
        <div>{t('检查状态: {{0}}', { 0: t('健康') })}</div>
      </header>
    </div>
  );
}

export default App;
