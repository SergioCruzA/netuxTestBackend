// require intial config
require('./src/config/config');

// const debug = require('debug');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const cors = require('kcors');

const vehicle = require('./src/routes/vehicle');

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

app.use(vehicle().routes());

// Create mongo conection
mongoose.connect(process.env.URLDB, { useNewUrlParser: true }, (err, resp) => {
  if (err) throw err;
  console.log('Data base ONLINE');
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;