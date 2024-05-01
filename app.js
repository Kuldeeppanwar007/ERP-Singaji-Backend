import express from "express";
import cors from "cors";
import { database } from "./utils";

// Import packages

// Import utilities

// Create App
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Initialize database connection
database.mongooseConnection();

// Import Routers
// import { } from "./routes";

// START: Routes


// END: Routes

export { app };