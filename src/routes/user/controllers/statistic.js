const userInterface = require('../../../interfaces/user');
const statisticInterface = require('../../../interfaces/statistic');

const controllers = [
  async (ctx, next) => {
    ctx.checkParams('identify')
      .notEmpty();

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
    const { params } = ctx;
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // Validate if user exists by identify
    const user = await userInterface.readOne({ identify: params.identify });
    if (!user) throw new Error('USER_NOT_EXISTS');

    // Count days of use by user
    const count = await statisticInterface
      .count({ 
        day: { $gte:1, $lte: 31 }, 
        month,
        year,
        user,
       });

    // Response 
    ctx.body = {
      status: 'success',
      data: { useDays: count },
    }
  },
];

module.exports = controllers;
