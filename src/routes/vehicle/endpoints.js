const Router = require('koa-router');

const router = new Router({ prefix: '/vehicles'});

module.exports = () => {
  router.get('/', async (ctx) => {
    ctx.body = {
      status: 'success',
      message: 'hello, vehicles!'
    };
  });
  router.get('/hola', async (ctx) => {
    ctx.body = {
      status: 'success',
      message: 'hello, again!'
    };
  });
  return router;
};