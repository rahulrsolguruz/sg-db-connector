import { createLogger, format, transports, Logger } from "winston";
import winston from "winston/lib/winston/config";

// Define the log levels
const logLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "green",
    debug: "blue",
  },
};

// Create the logger
const logger: Logger = createLogger({
  levels: logLevels.levels,
  format: format.combine(
    format.timestamp(),
    format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console({
      level: "debug",
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
});

// Add colors to the console output
winston.addColors(logLevels.colors);

// Export the logger instance
export default logger;
