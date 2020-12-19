'use strict';
const merge = require('object-assign');
const test = require('./config.test');

module.exports = merge(test, {
  mysql: {
    // 单数据库信息配置
    client: {
      host: '10.222.115.30',
      // 端口号
      port: '3306',
      // 用户名
      user: '',
      // 密码
      password: '',
      // 数据库名
      database: '',
      dateStrings: true,
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  },
});