import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import { logger } from "./utils/index.js";
import { userRouter, organizationRouter } from "./routes/v1/index.js";
import mongooseConnection from "./utils/database.util.js";

dotenv.config();

const port = process.env.PORT || 3000;

// Create an express app
const app = express();

// Enable CORS
app.use(cors);

// Enable JSON parsing
app.use(express.json());

// Connect to the database
mongooseConnection();

// Connect to the organization model
app.use("/api/organization", organizationRouter);

// Connect to the user model
app.use("/api/user", userRouter);

app.listen(port, () => {
    console.log(`🚀 App Started: http://localhost:`);
});

