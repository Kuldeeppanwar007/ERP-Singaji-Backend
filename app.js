// Import packages
import express from "express";
import cors from "cors";

// Create App
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Import Routers
import { userRouter, organizationRouter } from "./routes/index.js";
// START: Routes
app.use('/api/user', userRouter);
app.use('/api/organization', organizationRouter);
// END: Routes

export default app;