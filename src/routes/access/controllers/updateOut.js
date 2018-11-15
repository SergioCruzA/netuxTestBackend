const accessInterface = require('../../../interfaces/access');

const io = require('../../../socket/connection');

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
      const { identify, plate } = ctx.request.body;
      if (err.message === 'VEHICLE_NOT_EXISTS') {
        // Send event to admin room when vehicle is not register
        io.sockets.in('admin').emit('vehicle_not_register', { identify, plate });
      }
      ctx.status = err.status || 500;
      ctx.body = {
        status: 'error',
        message: err.message,
      }
    }
  },
  async (ctx) => {
    const { identify, plate } = ctx.request.body;
    console.log('Body: ', { identify, plate });

    // Call update interface to save exit date
    await accessInterface.updateOut({ identify, plate });

    ctx.body = {
      status: 'success',
    }
  },
];

module.exports = controllers;