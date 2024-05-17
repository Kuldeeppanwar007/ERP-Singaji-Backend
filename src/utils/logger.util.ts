import winston = require("winston");
import DailyRotateFile from "winston-daily-rotate-file";
const { combine, timestamp, json, printf } = winston.format;
var httpContext = require("express-http-context");

// Custom format to include reqId
const httpContextFormat = printf(({ level, message, timestamp }) => {
  const reqId = httpContext.get("reqId") || "N/A";
  return `${timestamp} [${level}] ${message} reqId: ${reqId}`;
});

// Filter the error logs
const errorFilter = winston.format((info, opts) => {
  return info.level === "error" ? info : false;
});

// Filter the info logs
const infoFilter = winston.format((info, opts) => {
  return info.level === "info" ? info : false;
});

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "http",
  format: combine(timestamp(), json(), httpContextFormat),
  transports: [
    new DailyRotateFile({
      dirname: "logs/combinedLogs",
      filename: "combined-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "14d",
    }),
    new DailyRotateFile({
      dirname: "logs/errorLogs",
      filename: "app-error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "14d",
      level: "error",
      format: combine(errorFilter(), timestamp(), json(), httpContextFormat),
    }),
    new DailyRotateFile({
      dirname: "logs/infoLogs",
      filename: "app-info%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "14d",
      level: "info",
      format: combine(infoFilter(), timestamp(), json(), httpContextFormat),
    }),
    new winston.transports.Console({
      format: combine(timestamp(), json(), httpContextFormat),
    }),
  ],
});
