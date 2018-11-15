const Router = require('koa-router');
const koaBody = require('koa-body');

// Require controllers of access
const createAccess = require('./controllers/create');
const updateOutAccess = require('./controllers/updateOut');

const router = new Router({ prefix: '/access'});

module.exports = () => {
  // Route for create access
  router.post('/in', koaBody({ multipart: true }), ...createAccess);

  // Route for update access
  router.patch('/out', ...updateOutAccess);

  return router;
};