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
          <ul><li>问题修复</li>
          <li>块存储修复纳管开源 Ceph 集群 O 版本，不兼容 MON 连接信息的问题</li>
          <li>文件存储修复 NFS 共享的子目录路径无法挂载的问题</li>
          <li>文件存储修复 NFS 共享不能通过长路径（/dfs/DistributedFileSystem/[share]）进行挂载的问题</li>
          <li>文件存储修复 NFS 协议写入的文件，通过 FTP 协议无权限进行操作的问题</li>
          <li>文件存储修复 NFS 协议在较大目录情况下 readdir 可能返回信息不足的问题</li>
          <li>对象存储修复多站点切换时，由于配置重新加载使得服务重启导致切换失败的问题</li>
          <li>对象存储修复分段上传完成时，body 不能超过 1MB 大小的问题</li></ul>

功能变化 XSpeed 存储池支持数据层修改 PG 分裂，缓存层不支持修改 PG 分裂，具体执行步骤参考 KB 块存储支持纳管卷的 QoS 设置，通过兼容 rbd config key
命令支持：rbd_qos_iops_limit、rbd_qos_bps_limit、rbd_qos_iops_burst、rbd_qos_bps_burst 块存储通过 Web UI 设置卷 QoS 会同样应用于 RBD 协议 文件存储废弃
SMB 回收站功能，后续使用 5.2 引入的文件目录统一回收站功能。
          <ol>
            <li>
              {t('国际化 i18next {{0}}{{1}}{{2}}%%', { 0: context, 1: '100%', 2: 100 })}
            </li>
            <li>
              {t('遍历 {{args, list}}', { args: ['a', 'b', 'c', 'e', 1, 2] })}
            </li>
            <li>
              {t('遍历 {{args, list}}', { args: ['a', 'b', 'c'] })}
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
              <Trans i18nKey='你好' count={context * 100}>
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
