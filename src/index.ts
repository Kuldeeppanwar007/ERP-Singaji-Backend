import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { logger } from "@utils/index";
import { v4 as uuidv4 } from "uuid";
import httContext from "express-http-context";
import {
  addressRoutes,
  countryRoutes,
  organizationRoutes,
  userRoutes,
  roleRoutes,
} from "@routes/v1/index";
import { mongooseConnection } from "@utils/index";
import { morganMiddleware, rateLimitMiddleware } from "middlewares";

// create express instance
const app = express();
const port = process.env.PORT || 3000;

// Initialize database connection
const url: string = <string>process.env.MONGODB_URI;
const db_name: string = <string>process.env.DB_NAME;
mongooseConnection(`${url}${db_name}`);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(httContext.middleware);

// Middleware to generate a unique request ID for each request
app.use(function (req, res, next) {
  const reqId = uuidv4();
  httContext.set("reqId", reqId);
  next();
});
app.use(rateLimitMiddleware);
app.use(morganMiddleware);

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/organization", organizationRoutes);
app.use("/api/v1/address", addressRoutes);
app.use("/api/v1/country", countryRoutes);
app.use("/api/v1/role", roleRoutes);

// Listening Server
app.listen(port, () => {
  logger.info(`🚀 App Started: http://localhost:${port}`);
});
