import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
dotenv.config();
import httContext from "express-http-context";

// Import utilities
import { logger, mongooseConnection } from "../src/utils/index";

// Import Middleware
import { morganMiddleware, rateLimitMiddleware } from "middlewares";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(httContext.middleware);
app.use(function (req, res, next) {
  const reqId = uuidv4();
  httContext.set("reqId", reqId);
  next();
});
app.use(rateLimitMiddleware);
app.use(morganMiddleware);

// Import Routers
import {
  addressRoutes,
  countryRoutes,
  organizationRoutes,
  userRoutes,
  tenantRouter,
} from "@routes/v1/index";

// // Initialize database connection
const url: string = <string>process.env.MONGODB_URI;
const db_name: string = <string>process.env.DB_NAME;
mongooseConnection(`${url}${db_name}`);

// START: Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/organization", organizationRoutes);
app.use("/api/v1/address", addressRoutes);
app.use("/api/v1/country", countryRoutes);
app.use("/api/v1/tenant", tenantRouter);

// Define Port
const port = process.env.PORT || 3000;

// Listening Server
app.listen(port, () => {
  logger.info(`🚀 App Started: http://localhost:${port}`);
});
