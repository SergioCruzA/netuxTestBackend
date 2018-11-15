const Router = require('koa-router');

const createUser = require('./controllers/create');
const statisticsByMoth = require('./controllers/statistic');

const router = new Router({ prefix: '/users'});

module.exports = () => {
  router.post('/', ...createUser);

  router.get('/statistics/:identify', ...statisticsByMoth);

  return router;
};