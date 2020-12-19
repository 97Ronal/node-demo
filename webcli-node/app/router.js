'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // const token2user = app.middleware.token2user({ threshold: 1024 });
  router.get('/', controller.home.index);
  // get请求 查询分页信息
  router.get('/business', controller.business.list);
  // get请求 查询指定id信息
  router.get('/business/:id', controller.business.get);
  // post请求 创建一条信息
  router.post('/business', controller.business.post);
  // put请求 修改指定id信息
  router.put('/business/:id', controller.business.put);
  // delete请求 删除指定id信息
  router.del('/business/:id', controller.business.delete);
  // token换用户信息
  router.get('/user/token2user', controller.user.get);

  // router.get('/business/:uid/check', controller.business);
  router.get('/debugLogin', controller.home.debugLogin);
};
