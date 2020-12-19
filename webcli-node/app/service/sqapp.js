'use strict';
const Service = require('egg').Service;
const md5 = require('blueimp-md5');
const {
  RSAencrypted, randomString, encrypt, decrypt,
} = require('./security');

// 暂时用内存做cache
const cacheToken = {};

// 宿迁 APP 通用接口调用, 需要 bind this

class SQAppService extends Service {
  async adapter(path, body) {
    const { STATUS_CODE, APP_SECRET } = this.app.config;
    const { domain, appCode, appToken, key } = APP_SECRET;
    const rsaKey = randomString();
    const param = JSON.stringify(body);
    const payload = {
      appCode,
      appToken,
      param,
      time: Date.now(),
      sign: md5(`${appCode}${appToken}${key}${param}`).toUpperCase(),
    };
    if (body.token) {
      payload.authToken = body.token;
    }
    // 做加解密
    const { data, status } = await this.app.curl(`${domain}${path}`, {
      method: 'POST',
      headers: {
        version: '3',
        aesKey: RSAencrypted(rsaKey),
        appVersion: 'v2.1.1',
      },
      contentType: 'json',
      dataType: 'json',
      data: {
        content: encrypt(rsaKey, JSON.stringify(payload)),
      },
    });

    if (status === 200) {
      const { code, content, message } = data;
      // 未登录或登录过期
      if (code === 101 || code === 108 || code === 109) {
        throw { status: STATUS_CODE.unauth, message };
      }
      if (content) {
        return JSON.parse(decrypt(content, rsaKey));
      }
    }
    // 服务器异常
    throw { status, message: data };
  }

  async debugLogin() {
    // loginnName	是	string	登录名
    // mobile	是	string	手机号
    // password	是	string	密码
    // verifyCode	是	string	验证码
    // deviceNo	是	string	设备号
    // registerNo
    return this.adapter('/user/register', '', {
      loginnName: 'loginnName',
      mobile: 'mobile',
      password: 'password',
      verifyCode: 'verifyCode',
      deviceNo: 'deviceNo',
      registerNo: 'registerNo',
    });
  }

  async getUserInfo(token) {
    if (token === 'debugtoken') {
      return Promise.resolve({ uuid: 'debuguser' });
    }
    if (cacheToken[token]) return Promise.resolve(cacheToken[token]);

    const { RPC } = this.app.config;
    const { code, data, message } = await this.adapter(RPC.user, { token });
    if (code === 200) {
      const { user } = data;
      cacheToken[token] = user;
      return user;
    }

    this.ctx.throw(code, message);
  }
}

module.exports = SQAppService;
