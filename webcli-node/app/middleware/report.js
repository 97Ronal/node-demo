'use strict';

module.exports = () => {
  return async function(ctx, next) {
    // const { method, url, body } = ctx.request;
    // ctx.logger.info(`request: ${method}::${url} body=%j`, body);
    const startTime = Date.now();
    await next();
    const duration = Date.now() - startTime;
    ctx.logger.info(`duration=${duration}ms`);
    // 暂时不加了， log 日志会比较大
    // ctx.logger.info(`duration=${duration}ms response=%j`, ctx.body);
  };
};
