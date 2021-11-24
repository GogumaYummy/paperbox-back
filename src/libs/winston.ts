import winston from 'winston';
import 'winston-daily-rotate-file';

const logDir = 'logs';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};
function level() {
  const environment = process.env.NODE_ENV || 'development';
  const isDev = environment === 'development';
  return isDev ? 'debug' : 'info';
}

winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
});

const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'HH:MM:SS' }),
  winston.format.printf(
    (info) => `${info.timestamp} [${info.level}] ${info.message}`,
  ),
);
const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:MM:SS' }),
  winston.format.colorize({ level: true }),
  winston.format.printf(
    (info) => `${info.timestamp} [${info.level}] ${info.message}`,
  ),
);

const log = winston.createLogger({
  levels: levels,
  level: level(),
  transports: [
    new winston.transports.DailyRotateFile({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir,
      filename: `%DATE%.log`,
      handleExceptions: true,
      maxFiles: '365d',
      format: fileFormat,
    }),
    new winston.transports.DailyRotateFile({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/error',
      filename: `%DATE%.error.log`,
      maxFiles: '365d',
      format: fileFormat,
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      format: consoleFormat,
    }),
  ],
});

export default log;
