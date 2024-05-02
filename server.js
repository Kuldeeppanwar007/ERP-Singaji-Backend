import express from 'express';
import dotenv from 'dotenv';
import dbConnection from './config/db.js';
import { userRouter, organizationRouter } from "./routes/index.js";

// Create a config file to store the environment variables
dotenv.config();
const PORT = process.env.PORT || 5000;

// Create an express app
const app = express();

// Create a middleware to parse JSON data
app.use(express.json());

// Connect to the database
dbConnection();

// Create a route for the users 
app.use('/api/users', userRouter);

// Create a route for the organizations
app.use('/api/organization', organizationRouter);

// Connect to the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

