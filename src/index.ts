import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// Import utilities
import { mongooseConnection } from "../src/utils/index";

// Import Middleware
import { rateLimitMiddleware } from 'middlewares';

const app = express()

// Middlewares
app.use(cors());
app.use(express.json());

app.use(rateLimitMiddleware)


// Import Routers
import { addressRoutes, countryRoutes, organizationRoutes, userRoutes } from "@routes/v1/index";

// // Initialize database connection
const url: string = <string>process.env.MONGODB_URI;
mongooseConnection(url);

app.get("/string", (req,res)=>{
  console.log("called")
})

// START: Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/organization", organizationRoutes);
app.use("/api/v1/address", addressRoutes)
app.use("/api/v1/country", countryRoutes)

// Define Port
const port = process.env.PORT || 3000;

// Listening Server
app.listen(port, () => {
  console.log(`🚀 App Started: http://localhost:${port}`);
});
