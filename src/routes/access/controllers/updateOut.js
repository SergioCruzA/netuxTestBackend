const accessInterface = require('../../../interfaces/access');

const controllers = [
  async (ctx, next) => {
    ctx.checkBody('identify')
      .optional();

    ctx.checkBody('plate')
      .optional()
      .toUppercase();

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
    const { identify, plate } = ctx.request.body
    console.log('Body: ', { identify, plate });

    await accessInterface.updateOut({ identify, plate });

    ctx.body = {
      status: 'success',
    }
  },
];

module.exports = controllers;