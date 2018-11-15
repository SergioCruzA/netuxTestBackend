const fs = require('fs');

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
    const { identify, plate } = ctx.request.body;
    const file = ctx.request.files.image

    const { type, path } = file;

    const buffer = fs.readFileSync(path);
    const img = {
      data: buffer, 
      contentType: type
    }

    const access = await accessInterface.createAccess({ identify, plate, img });

    ctx.body = {
      status: 'success',
      data: access,
    }
  },
];

module.exports = controllers;