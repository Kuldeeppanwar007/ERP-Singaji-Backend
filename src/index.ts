import express from 'express';
// import cors from "cors";
import dotenv from "dotenv";
// import { logger } from "./utils/index.js";
import { userRouter, organizationRouter } from "./routes/v1/index.js";
import { connectCentralDB } from "./utils/db.js";

dotenv.config();

const port = process.env.PORT || 3000;

// Create an express app
const app = express();

// Enable CORS
// app.use(cors);

// Enable JSON parsing
app.use(express.json());

// Connect to the database
connectCentralDB();

// // Connect to the organization model
app.use("/api/organization", organizationRouter);

// // Connect to the user model
app.use("/api/user", userRouter);

// Default Route Configuration
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`🚀 App Started: http://localhost:${port}`);
});
