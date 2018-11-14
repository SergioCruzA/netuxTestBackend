const Router = require('koa-router');

const createAccess = require('./controllers/create');
const updateOutAccess = require('./controllers/updateOut')

const router = new Router({ prefix: '/access'});

module.exports = () => {
  router.post('/in', ...createAccess);

  router.patch('/out', ...updateOutAccess);

  return router;
};