import logo from './logo.svg';
import './App.css';
import { t } from 'i18next';
import { Trans } from "react-i18next";
import { initReactI18n } from './locale';

initReactI18n();

function App() {
  const context = Math.random().toFixed(2);
  const name = "kai guo";
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-i18next">
          <h1>======react-i18next======</h1>
          <ol>
            <li>
              {t('国际化 i18next {{0}}{{1}}{{2}}', { 0: context, 1: '100%', 2: 100 })}
            </li>
            <li>
              <Trans i18nKey="My text that can be <b>{{boldPlaceholder}}</b>">My text that can be <b>{{ boldPlaceholder: 'Bold' }}</b></Trans>
            </li>
            <li>
              <Trans i18nKey={`测试标签<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer" >Learn React</a>访问链接`}>
                测试标签<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer" >Learn React</a>访问链接
              </Trans>
            </li>
            <li>
              {t('检查状态: {{0}}', { 0: t('健康') })}
            </li>
            <li>
              <Trans i18nKey="myLangText">
                Please click <a href="baidu.com">Key</a> for further information.
              </Trans>
            </li>
            <li>
              <Trans i18nKey='Object with ID <strong>Num.12</strong> is of unknown type.Go back to <a href="/objects" onClick={() => alert(0)}>Objects</a> route.'>
                Object with ID <strong>Num.12</strong> is of unknown type.
                Go back to <a
                  href="/objects"
                  onClick={() => alert(0)}
                >
                  Objects
                </a> route.
              </Trans>
            </li>
            <li>
              <Trans i18nKey='你好 <strong>{{ name }}</strong>, 你有 {{ context }} 条未读信息. <a href="http://baidu.com">前往查看</a>' count={context * 100}>
                你好 <strong>{{ name }}</strong>, 你有 {{ context }} 条未读信息. <a href="http://baidu.com">前往查看</a>.
              </Trans>
            </li>
            <li>
              <Trans
                i18nKey="你好 <italic>美丽的</italic> <bold>{{what}}</bold><btn>{{enter}}</btn>" // optional -> fallbacks to defaults if not provided
                defaults="你好 <italic>美丽的</italic> <bold>{{what}}</bold><btn>{{enter}}</btn>" // optional defaultValue
                values={{ what: '世界', enter: '进入' }}
                components={{ italic: <i />, bold: <strong />, btn: <button /> }}
              />
            </li>
            <li>
              <Trans
                i18nKey="hello <0>{{what}}</0> <1>{{enter}}</1>" // optional -> fallbacks to defaults if not provided
                defaults="hello <0>{{what}}</0> <1>{{enter}}</1>" // optional defaultValue
                values={{ what: 'world', enter: 'wonderful！' }}
                components={[<strong></strong>, <a href="https://reactjs.org"> </a>]}
              />
            </li>
          </ol>
        </div>
      </header>
    </div >
  );
}

export default App;
