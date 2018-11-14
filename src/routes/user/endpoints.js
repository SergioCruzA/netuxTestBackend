const Router = require('koa-router');

const createUser = require('./controllers/create');

const router = new Router({ prefix: '/users'});

module.exports = () => {
  router.post('/', ...createUser);

  return router;
};