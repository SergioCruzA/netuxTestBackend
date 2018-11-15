// Require interface of user
const userInterface = require('../../../interfaces/user');

const controllers = [
  async (ctx, next) => {
    ctx.checkBody('name')
      .notEmpty();

    ctx.checkBody('identify')
      .notEmpty();

    ctx.checkBody('email')
      .optional()
      .isEmail();

    ctx.checkBody('age')
      .optional()
      .isInt()
      .toInt();

    ctx.checkBody('jobTitle')
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
    const body = ctx.request.body
    console.log('Body: ', body);

    // Create an user
    const user = await userInterface.create(body);

    ctx.body = {
      status: 'success',
      data: user,
    }
  },
];

module.exports = controllers;
