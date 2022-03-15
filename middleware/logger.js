import winston from "winston";
import { customLevels } from './customLogLevels';

const apiLogger = winston.createLogger({
  level: 'info',
  // levels: customLevels,
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  dirname: './logs',
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.Console({ level: 'warn' }),
    new winston.transports.File({ filename: 'api.log' }),
  ],
  exceptions: [
    new winston.transports.File({ filename: 'exceptions.log' })
  ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  apiLogger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    )
  }));
}

export { apiLogger };