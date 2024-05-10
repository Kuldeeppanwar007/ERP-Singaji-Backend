import express from "express";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

// Import utilities
import { mongooseConnection } from "../src/utils/index";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Import Routers
import { organizationRouter, userRouter } from "@routes/v1/index";

// // Initialize database connection
const url: string = <string>process.env.MONGODB_URI;
console.log(url);
mongooseConnection(url + "Singa_Ji_Erp_Master");

// START: Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/organization", organizationRouter);

// Define Port
const port = process.env.PORT || 3000;

// Listening Server
app.listen(port, () => {
  console.log(`🚀 App Started: http://localhost:${port}`);
});
