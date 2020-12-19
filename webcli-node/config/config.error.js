'use strict';

// 这个是针对异常的处理过程， 【真异常】
module.exports = {
  all(err, ctx) {
    // 在此处定义针对所有响应类型的错误处理方法
    // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
    let message = err.message || '';
    const { STATUS_CODE } = ctx.app.config;
    switch (err.status && !err.message) {
      case STATUS_CODE: message = '用户未登录或登录过期'; break;
      default:
        if (process.env.NODE_ENV === 'production') {
          message = '服务器异常';
        } else {
          message = err.message;
        }
    }

    const body = { code: err.code || err.status || STATUS_CODE.error, message };
    ctx.body = JSON.stringify(body);
  },
};
