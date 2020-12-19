'use strict';
const Controller = require('egg').Controller;

// u can get userinfo from ctx.middlewareData.user,

class UserController extends Controller {
  async get() {
    const { ctx } = this;
    const { token } = ctx.query;
    const user = await ctx.service.sqapp.getUserInfo(token);
    const { STATUS_CODE } = this.app.config;
    ctx.body = {
      code: STATUS_CODE.success,
      data: user,
    };
  }
}

module.exports = UserController;
