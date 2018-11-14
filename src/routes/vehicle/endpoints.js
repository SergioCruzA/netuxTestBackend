const Router = require('koa-router');

const createVehicle = require('./controllers/create');

const router = new Router({ prefix: '/vehicles'});

module.exports = () => {
  router.post('/', ...createVehicle);

  router.get('/hola', async (ctx) => {
    ctx.body = {
      status: 'success',
      message: 'hello, again!'
    };
  });
  return router;
};