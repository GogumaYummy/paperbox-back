import { Middleware } from 'koa';
import morgan, { StreamOptions } from 'koa-morgan';
import log from './winston';

const stream: StreamOptions = {
  write: (message) => log.http(message),
};

const morganMiddleware: Middleware = (ctx, next) => {
  const environment = process.env.NODE_ENV || 'development';
  return morgan(environment === 'production' ? 'combined' : 'dev', {
    stream,
  })(ctx, next);
};

export default morganMiddleware;
