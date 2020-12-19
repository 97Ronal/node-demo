'use strict';
module.exports = () => {
  return async function(ctx, next) {
    // const { token } = ctx.query;
    const token = ctx.cookies.get('token');
    if (!token) ctx.throw(401, 'no authentication');
    const user = await ctx.service.sqapp.getUserInfo(token);
    if (!user) ctx.throw(400, 'invalid openid');
    ctx.middlewareData = { user };
    await next();
  };
};
