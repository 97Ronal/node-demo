'use strict';

module.exports = {
  STATUS_CODE: {
    success: 200,
    error: 500,
    // 需要加到 middleware, 这些接口都要验证用户信息
    unauth: 401,
  },
  RPC: {
    user: '/user/tokenByVirus',
  },
};
