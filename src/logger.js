const winston = require("winston");
const { format } = require("winston");

const customFormat = format.combine(
  format.timestamp(),
  format.printf(
    (info) => `${info.timestamp} [${info.level.toUpperCase()}] ${info.message.req.method} ${info.message.req.url} ${info.message.err ? `\n${info.message.err.stack}` : ""}`,
  ),
);

const logger = winston.createLogger({
  format: customFormat,
  transports: [
    new winston.transports.Console({ level: "silly" }),
    new winston.transports.File({ filename: "app.log", level: "info" }),
  ],
});

module.exports = { logger };
