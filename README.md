# svrx-plugin-babel

[![NPM version][npm-image]][npm-url] [![Known Vulnerabilities][vulnerabilities-status-image]][vulnerabilities-status-url] [![changelog][changelog-image]][changelog-url] [![license][license-image]][license-url]

[vulnerabilities-status-image]: https://snyk.io/test/npm/svrx-plugin-babel/badge.svg
[vulnerabilities-status-url]: https://snyk.io/test/npm/svrx-plugin-babel
[npm-image]: https://img.shields.io/npm/v/svrx-plugin-babel.svg?style=flat-square
[npm-url]: https://npmjs.org/package/svrx-plugin-babel
[license-image]: https://img.shields.io/github/license/ufologist/svrx-plugin-babel.svg
[license-url]: https://github.com/ufologist/svrx-plugin-babel/blob/master/LICENSE
[changelog-image]: https://img.shields.io/badge/CHANGE-LOG-blue.svg?style=flat-square
[changelog-url]: https://github.com/ufologist/svrx-plugin-babel/blob/master/CHANGELOG.md

[![npm-image](https://nodei.co/npm/svrx-plugin-babel.png?downloads=true&downloadRank=true&stars=true)](https://npmjs.com/package/svrx-plugin-babel)

[svrx](https://github.com/x-orpheus/svrx) plugin for [Babel](https://babeljs.io)

transform js/json file content on the fly

## Usage

> **please confirm you have [installed svrx](https://github.com/x-orpheus/svrx) already**

```shell
npm i @svrx/cli -g
```

Install `svrx-plugin-babel`
```shell
npm i svrx-plugin-babel save-dev
```

```javascript
// .svrxrc.js
module.exports = {
  plugins: [
    'babel'
  ]
};
```

[插件的使用](https://docs.svrx.io/zh/plugin/usage.html)