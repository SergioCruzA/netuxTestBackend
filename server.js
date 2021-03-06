// require intial config
require('./src/config/config');

// require to init socket connection
require('./src/socket/connection');

const Koa = require('koa');
const koaValidate = require('koa-validate');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const cors = require('kcors');

const vehicle = require('./src/routes/vehicle');
const user = require('./src/routes/user');
const access = require('./src/routes/access');
const validatorHelper = require('./src/helper/validator');

const app = new Koa();
const PORT = process.env.PORT;

// Healty check
/* app.use(async (ctx) => {
  ctx.body = {
    status: 'success',
    message: 'hello, world!'
  };
}); */
app 
  .use(bodyParser())
  .use(cors({ allowMethods: 'GET,POST,PUT,PATCH,DELETE' }))
  .use(validatorHelper)

app.use(vehicle().routes());
app.use(user().routes());
app.use(access().routes());

koaValidate(app);

// Create mongo conection
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true, }, (err, resp) => {
  if (err) throw err;
  console.log('Data base ONLINE');
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;