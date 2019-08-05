# egg-udp

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-udp.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-udp
[travis-image]: https://img.shields.io/travis/eggjs/egg-udp.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-udp
[snyk-image]: https://snyk.io/test/npm/egg-udp/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-udp
[download-image]: https://img.shields.io/npm/dm/egg-udp.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-udp

udp plugin for egg.

## Install

```bash
$ npm i egg-udp --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.udp = {
  enable: true,
  package: 'egg-udp',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.udp = {
  port: 5000,
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

```js
// {app_root}/app/udp/controller/proxy.ts
import {  Application } from 'egg';
import { Socket } from 'dgram';

interface Rinfo {
  address: string,
  family: string,
  port: number,
  size: number,
}

export default (app: Application) => {
  return {
    async handle(udp: Socket) {
      udp.on('error', (err) => {
        console.log(`udp error:\n${err.stack}`);
      });

      udp.on('message', (msg, rinfo: Rinfo) => {
        server.on('message', (msg, rinfo) => {
  			console.log(`udp server got: ${msg.toString()} from ${rinfo.address}:${rinfo.port}`);
});
      });

      udp.on('listening', () => {
        const address = udp.address();
        console.log(`udp listening ${address.address}:${address.port}`);
      });
    },
  };
};
  
// {app_root}/app/router.ts
app.udp.handle('proxy.handle');
```

## Test

```bash
// Test udp server by Linux
$ echo "2019-05-20T15:30:57 testlog" | nc -u -w1 127.0.0.1 5000
// check it in server log
udp server got: 2019-05-20T15:30:57 testlog from 127.0.0.1:5000
```

## License

[MIT](LICENSE)
