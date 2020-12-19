'use strict';
const merge = require('object-assign');
const constance = require('./config.constance');
const onerror = require('./config.error');

const config = {
  onerror,
  keys: '_suqian_epidemic_business_backend_12345654321',
  middleware: [ 'report' ],
  // middleware: [ 'token2user', 'report' ],
  cors: {
    credentials: true,
    // {string|Function}
    origin: ctx => ctx.get('origin'),
    // {string|Array}
    allowMethods: 'HEAD,PUT,POST,DELETE,PATCH',
  },
  cluster: {
    listen: {
      port: 3010,
    },
  },
  security: {
    csrf: {
      // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
      ignore: ctx => {
        console.log(ctx.ip);
        return true;
        // isInnerIp(ctx.ip)
      },
    },
    domainWhiteList: [ 'http://localhost:3010' ],
  },
};
module.exports = merge(config, constance);
