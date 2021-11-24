import dotenv from 'dotenv';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import Router from 'koa-router';
import morganMiddleware from './libs/morganMiddleware';
import log from './libs/winston';

dotenv.config();

const app = new Koa();
const router = new Router();

const { PORT, NODE_ENV } = process.env;

if (NODE_ENV === 'production') {
  app.use(helmet());
}

app
  .use(bodyParser())
  .use(morganMiddleware)
  .use(router.routes())
  .use(router.allowedMethods());

const port = PORT || 5000;

app.listen(port, () => {
  log.info(`Listening to port ${port}`);
});
