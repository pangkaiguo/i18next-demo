// https://github.com/i18next/i18next-scanner
const fs = require('fs');
const chalk = require('chalk');
const typescriptTransform = require('i18next-scanner-typescript');

module.exports = {
  input: [
    'src/**/*.{js,jsx,ts,tsx}',
    // Use ! to filter out files or directories
    '!src/**/*.spec.{js,jsx,ts,tsx}',
    '!src/locale/**',
    '!**/node_modules/**',
  ],
  output: './',
  options: {
    debug: true,
    func: {
      list: ['i18next.t', 'i18n.t', 't'],
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    trans: {
      component: 'Trans',
      i18nKey: 'i18nKey',
      defaultsKey: 'defaults',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      fallbackKey: function (ns, value) {
        return value;
      },
      acorn: {
        ecmaVersion: 2020,
        sourceType: 'module', // defaults to 'module'
        // Check out https://github.com/acornjs/acorn/tree/master/acorn#interface for additional options
      },
      // https://github.com/nucleartux/i18next-scanner-typescript
      transform: typescriptTransform({
        // default value for extensions
        extensions: ['.ts', '.tsx'],
        // optional ts configuration
        tsOptions: {
          target: 'es2020',
        },
      }),
    },
    lngs: ['en'],
    ns: [
      'locale',
    ],
    defaultLng: 'en',
    defaultNs: 'locale',
    // defaultValue: '__STRING_NOT_TRANSLATED__', // parser.parseFuncFromString defined key as default value.
    resource: {
      loadPath: 'src/{{ns}}/{{lng}}.json',
      savePath: 'src/{{ns}}/{{lng}}.json',
      jsonIndent: 2,
      lineEnding: '\n'
    },
    nsSeparator: false, // namespace separator
    keySeparator: false, // key separator
    interpolation: {
      prefix: '{{',
      suffix: '}}'
    }
  },
  transform: function customTransform(file, enc, done) {

    const parser = this.parser;
    const content = fs.readFileSync(file.path, enc);
    let count = 0;

    parser.parseFuncFromString(content, { list: ['i18next._', 'i18next.__', 't'] }, (key, options) => {
      options.defaultValue = key;
      parser.set(key, Object.assign({}, options, {
        nsSeparator: false,
        keySeparator: false
      }));
      ++count;
    });

    if (count > 0) {
      console.log(`i18next-scanner: count=${chalk.cyan(count)}, file=${chalk.yellow(JSON.stringify(file.relative))}`);
    }

    done();
  }
};