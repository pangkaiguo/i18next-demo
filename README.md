
# A Guide to React Localization with i18next

- [A Guide to React Localization with i18next](https://phrase.com/blog/posts/localizing-react-apps-with-i18next)

# Practice i18n translation in project with the following libraries

- i18next
- react-i18next
- i18next-scanner
- i18next-conv
- private extend plugins for i18next...

## Basic Dependencies

``` dependencies
// install dependencies
yarn add i18next react-i18next i18next-conv i18next-scanner

// dependencies
"dependencies": {
    "i18next": "^21.6.7",
    "i18next-conv": "^11.0.3",
    "react-i18next": "^11.15.3",
  },
// devdependencies
"devDependencies": {
    "i18next-scanner": "^3.1.0"
  }
```

- [Use i18next-scanner to export or scanner keys.](https://github.com/i18next/i18next-scanner)
- [Use i18next-conv to trans json and po files.](<https://github.com/i18next/i18next-gettext-converter>)
- [Create private plugins and methods.](https://www.i18next.com/misc/creating-own-plugins#create-a-private-method-to-initialize-your-plugin)

## Other Configerations

- [Load po files as i18next format directly in webpack.](https://github.com/queicherius/i18next-po-loader)
- [Use locize backend with config.](https://github.com/locize/react-tutorial)
- [How to properly internationalize a React application using i18next, such as language switcher.](https://dev.to/adrai/how-to-properly-internationalize-a-react-application-using-i18next-3hdb)

## Library Versions

- [Versions diff.](https://react.i18next.com/latest/migrating-v9-to-v10)

## Something about react component

- [Look forward the issue about the Trans component's usage.](https://stackoverflow.com/questions/55000798/react-i18next-and-replacing-placeholder-keys-with-components)

## Useage

``` jsx
// Simple
// json: "国际化 i18next {{0}}{{1}}{{2}}": "国际化 i18next {{0}}{{1}}{{2}}"
// result: 国际化 i18next 0.25100%100
t('国际化 i18next {{0}}{{1}}{{2}}', { 0: context, 1: '100%', 2: 100 })

// Trans Component HOC https://github.com/i18next/react-i18next-gitbook/blob/master/latest/trans-component.md

// Trans eg.1: 
// json: "你好 <strong>{{ name }}</strong>, 你有 {{ context }} 条未读信息. <a href=\"http://baidu.com\">前往查看</a>": "你好 <1><0>{{name}}</0></1>, 你有 <3>{{context}}</3> 条未读信息. <5>前往查看</5>.",
// result: 你好 kai guo, 你有 1.00 条未读信息. 前往查看.
<Trans i18nKey='你好 <strong>{{ name }}</strong>, 你有 {{ context }} 条未读信息. <a href="http://baidu.com">前往查看</a>' count={context * 100}>
  你好 <strong>{{ name }}</strong>, 你有 {{ context }} 条未读信息. <a href="http://baidu.com">前往查看</a>.
</Trans>

// Trans eg.2
// json: "你好 <italic>美丽的</italic> <bold>{{what}}</bold><btn>{{enter}}</btn>": "你好 <italic>美丽的</italic> <bold>{{what}}</bold><btn>{{enter}}</btn>"
// result: 你好 美丽的 世界进入
<Trans
  i18nKey="你好 <italic>美丽的</italic> <bold>{{what}}</bold><btn>{{enter}}</btn>" // optional -> fallbacks to defaults if not provided
  defaults="你好 <italic>美丽的</italic> <bold>{{what}}</bold><btn>{{enter}}</btn>" // optional defaultValue
  values={{ what: '世界', enter: '进入' }}
  components={{ italic: <i />, bold: <strong />, btn: <button /> }}
/>

// Trans eg.3
// json "Object with ID <strong>Num.12</strong> is of unknown type.Go back to <a href=\"/objects\" onClick={() => alert(0)}>Objects</a> route.": "Object with ID <1>Num.12</1> is of unknown type. Go back to <3>Objects</3> route.",
// result: Object with ID Num.12 is of unknown type. Go back to Objects route.
<Trans i18nKey='Object with ID <strong>Num.12</strong> is of unknown type.Go back to <a href="/objects" onClick={() => alert(0)}>Objects</a> route.'>
  Object with ID <strong>Num.12</strong> is of unknown type.
  Go back to <a
    href="/objects"
    onClick={() => alert(0)}
  >
    Objects
  </a> route.
</Trans>

// How to analyze duplicate keys. See the configurations for help:`contextSeparator` and `pluralSeparator` in https://www.i18next.com/overview/configuration-options#others
// 默认通过最后一个 `_` 下划线来标识和区分一些可能重复的关键字
// 翻译的时候需要注意 po 文件的分割方式， 下划线会把原有完整的一个词条分割掉，msgid 会不完整，得结合 msgctxt，但是如例子中的`本地用户`是故意为之的-msgid是正确的。
// keys in json file :
"本地用户_navigation": "Local User"

"请输入合法的服务名称。支持 1 ~ 80 个字符，中文、大小写字母、数字、下划线（_）、连字符（-）和句点（.）": "Please enter a legal service name. Support 1 ~ 80 characters, Chinese, uppercase and lowercase letters, numbers, underscores(_), hyphens(-) and periods(.)",

"配置二级菜单需要先配置一级菜单，否则二级菜单无法生效。配置规则为：title_一级菜单下标_二级菜单下标，path_一级菜单路由下标_二级菜单路由下标。配置样例：": "To configure the second-level menu, you need to configure the first-level menu first, otherwise the second-level menu will not take effect. The configuration rules are: title_first-level menu subscript_second-level menu subscript, path_first-level menu routing subscript_second-level menu routing subscript. Configuration example:",
// keys in po file:
/* 故意为之的词条分割（navigation加上是为了标识菜单使用的词条，防止重复） */
msgctxt "navigation"
msgid "本地用户"
msgstr "Local User"

/* 完整词条被分割掉 */
msgctxt "）、连字符（-）和句点（.）"
msgid "请输入合法的服务名称。支持 1 ~ 80 个字符，中文、大小写字母、数字、下划线（"
msgstr ""
"Please enter a legal service name. Support 1 ~ 80 characters, Chinese, "
"uppercase and lowercase letters, numbers, underscores(_), hyphens(-) and "
"periods(.)"

/* 最后一个下划线分割 */
msgctxt "二级菜单路由下标。配置样例："
msgid "配置二级菜单需要先配置一级菜单，否则二级菜单无法生效。配置规则为：title_一级菜单下标_二级菜单下标，path_一级菜单路由下标"
msgstr ""
"To configure the second-level menu, you need to configure the first-level "
"menu first, otherwise the second-level menu will not take effect. The "
"configuration rules are: title_first-level menu subscript_second-level menu "
"subscript, path_first-level menu routing subscript_second-level menu "
"routing subscript. Configuration example:"

```

## Scripts

```scripts
// config following scripts in package.json
"i18n:scanner": "i18next-scanner --config src/locale/config.js 'src/**/*.{js,jsx}'",
"i18n:json2po": "i18next-conv -l en -s src/locale/en.json -t src/locale/en.po",
"i18n:po2json": "i18next-conv -l en -s src/locale/en.po -t src/locale/en.json"

// scan all international keys to json file with i18next-scanner 
yarn i18n:scanner

// convert json file into po file with i18next-conv.
yarn i18n:json2po

// convert po file into json file with i18next-conv.
yarn i18n:po2json

```
