'use strict';

exports.mysql = {
  // 单数据库信息配置
  client: {
    // test-uc.urban-computing.cn
    host: 'localhost',
    // 端口号
    port: '3306',
    // 用户名
    user: 'root',
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
};

exports.logger = {
  dir: './logs',
};

exports.appdomain = '//59.151.64.31:8451/';
exports.APP_SECRET = {
  appCode: 'app_virus',
  appToken: '71b013e40061463a9f5e5777be5efbff',
  key: '8742938709234719',
  domain: 'https://suqian.app.urban-computing.cn/cloud/v4/',
};

// exports.APP_SECRET = {
//   appCode: 'app_cloud',
//   appToken: 'app_cloud',
//   key: '12345678',
//   domain: 'https://suqian.app.urban-computing.cn/cloud/v2',
// };
