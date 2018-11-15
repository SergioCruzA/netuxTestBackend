const vehicleInterface = require('../../../interfaces/vehicle');

const controllers = [
  async (ctx, next) => {
    ctx.checkBody('kind')
      .notEmpty()
      .toUppercase()
      .isIn(['CAR', 'MOTORCYCLE', 'BIKE']);

    ctx.checkBody('model')
      .optional()
      .isInt()
      .toInt();

    ctx.checkBody('doors')
      .optional()
      .isInt()
      .toInt();

    ctx.checkBody('cilind')
      .optional()
      .isInt()
      .toInt();

    ctx.checkBody('times')
      .optional()
      .isInt()
      .toInt()
      .isIn([2, 4]);

    ctx.checkBody('plate')
      .optional()
      .toUppercase();

    ctx.checkBody('typeBike')
      .optional();

    return ctx.validate(next);
  },
  async (ctx, next) => {
    try {
      return await next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = {
        status: 'error',
        message: err.message,
      }
    }
  },
  async (ctx) => {
    const body = ctx.request.body;
    const { user } = ctx.request.body;
    console.log('Body: ', body);

    const vehicle = await vehicleInterface.create(body, user);

    ctx.body = {
      status: 'success',
      data: vehicle,
    }
  },
];

module.exports = controllers;
