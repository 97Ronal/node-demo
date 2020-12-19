'use strict';
const Controller = require('egg').Controller;

// u can get userinfo from ctx.middlewareData.user,

class BusinessController extends Controller {
  // 获取指定id信息方法
  async get() {
    const { ctx } = this;
    const id = ctx.params.id;
    const data = await ctx.service.business.get({ id });
    const { STATUS_CODE } = this.app.config;
    ctx.body = {
      code: STATUS_CODE.success,
      data,
    };
  }
  // 获取列表信息方法
  async list() {
    const { ctx } = this;
    let { pageSize, pageNum } = ctx.query;
    pageSize = Number(pageSize);
    pageNum = Number(pageNum);
    const data = await ctx.service.business.list({ pageSize, pageNum });
    const { STATUS_CODE } = this.app.config;
    ctx.body = {
      code: STATUS_CODE.success,
      data,
    };
  }
  // 创建信息方法
  async post() {
    const { appdomain } = this.app.config;
    const { ctx } = this;
    const {
      user_id,
      unit_name,
      unit_address,
      contact_name,
      contact_mobile,
      contact_card_num,
      contact_code,
      district_id,
      district_name,
      verificationSign,
    } = ctx.request.body;
    // 调用张伟接口 check verifyCode 是否正确
    const checkOpts = {
      openId: user_id,
      verifyCode: contact_code,
      verificationSign,
      mobile: contact_mobile,
    };

    const { data } = await ctx.curl(`${appdomain}suqianvirus/checkVerifyCode`, {
      method: 'POST',
      contentType: 'json',
      dataType: 'json',
      data: checkOpts,
    });
    // 做参数校验
    const { STATUS_CODE } = this.app.config;
    if (data.code === '00000') {
      try {
        await ctx.service.business.add({
          user_id,
          unit_name,
          unit_address,
          contact_name,
          contact_mobile,
          contact_card_num,
          district_id,
          district_name,
        });
        ctx.body = {
          code: STATUS_CODE.success,
          data: 'ok',
        };
      } catch (e) {
        ctx.body = {
          code: STATUS_CODE.error,
          message: e,
          data: e,
        };
      }
    } else {
      throw data;
    }
  }
  // 修改指定id信息方法
  async put() {
    const { ctx } = this;
    const id = ctx.params.id;
    const {
      unit_name,
      unit_address,
    } = ctx.request.body;
    const data = await ctx.service.business.put({ unit_name, unit_address }, { id });
    const { STATUS_CODE } = this.app.config;
    if (data.affectedRows === 1) {
      ctx.body = {
        code: STATUS_CODE.success,
        data: '修改成功',
      };
    } else {
      ctx.body = {
        code: STATUS_CODE.error,
        message: data.message,
      };
    }
  }
  // 删除指定id信息方法
  async delete() {
    const { ctx } = this;
    const id = ctx.params.id;

    const data = await ctx.service.business.delete({ id });
    const { STATUS_CODE } = this.app.config;
    if (data.affectedRows === 1) {
      ctx.body = {
        code: STATUS_CODE.success,
        data: '删除成功',
      };
    } else {
      ctx.body = {
        code: STATUS_CODE.error,
        message: data.message,
      };
    }
  }
}

module.exports = BusinessController;
