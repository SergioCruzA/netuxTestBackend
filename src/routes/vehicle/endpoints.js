const Router = require('koa-router');

// Require controller of vehicle
const createVehicle = require('./controllers/create');

const router = new Router({ prefix: '/vehicles'});

module.exports = () => {
  // Route for create vehicle
  router.post('/', ...createVehicle);

  return router;
};