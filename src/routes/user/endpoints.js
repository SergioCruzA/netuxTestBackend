const Router = require('koa-router');

// Require controllers of user
const createUser = require('./controllers/create');
const statisticsByMoth = require('./controllers/statistic');

const router = new Router({ prefix: '/users'});

module.exports = () => {
  // Route for create user
  router.post('/', ...createUser);

  // Route for read statistics by identify
  router.get('/statistics/:identify', ...statisticsByMoth);

  return router;
};