const Router = require('koa-router');

const createAccess = require('./controllers/create');
const updateOutAccess = require('./controllers/updateOut');

const koaBody = require('koa-body');

const router = new Router({ prefix: '/access'});

module.exports = () => {
  router.post('/in', koaBody({ multipart: true }), ...createAccess);

  router.patch('/out', ...updateOutAccess);

  return router;
};