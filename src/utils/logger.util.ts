import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { v4 as uuidv4 } from "uuid";
import httpContext from "express-http-context";

const { combine, timestamp, json, printf } = winston.format;

// Custom format to include reqId and optional additional data
const customFormat = printf(({ level, message, timestamp, ...metadata }) => {
  const reqId = httpContext.get("reqId") || "N/A";
  return `${timestamp} [${level}] ${message} reqId: ${reqId} ${JSON.stringify(
    metadata
  )}`;
});

// Log filters (for separate error and info logs)
const errorFilter = winston.format((info, opts) =>
  info.level === "error" ? info : false
);
const infoFilter = winston.format((info, opts) =>
  info.level === "info" ? info : false
);

// Create the logger instance
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info", 
  format: combine(timestamp(), json(), customFormat),
  transports: [
    new DailyRotateFile({
      filename: "logs/combined-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
    new DailyRotateFile({
      filename: "logs/error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
      level: "error",
      format: combine(errorFilter(), timestamp(), json(), customFormat),
    }),
    new DailyRotateFile({
      filename: "logs/info-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
      level: "info",
      format: combine(infoFilter(), timestamp(), json(), customFormat),
    }),
    new winston.transports.Console({
      // Add console transport for development
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});
