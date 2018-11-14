module.exports = async(ctx,next) => {
  ctx.validate = (nxt) => {
    if (ctx.errors) {
      console.log('Validate', ctx.errors);
      const errors = ctx.errors;
      ctx.status = 400;
      ctx.body = { errors };
      return null;
    }
    return nxt();
  };
  return next();
}