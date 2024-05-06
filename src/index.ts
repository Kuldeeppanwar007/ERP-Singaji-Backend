
import express from 'express'
import  cors from 'cors'

import dotenv from 'dotenv'
dotenv.config()

// Import utilities
import { mongooseConnection } from "../src/utils/index";

const app = express()

// Middlewares
app.use(cors());
app.use(express.json());

// Import Routers
import { organizationRouter,userRouter } from '@routes/v1/index';

// START: Routes
app.use('/api/user', userRouter);
app.use('/api/organization', organizationRouter);

// // Initialize database connection
mongooseConnection();




// Define Port
const port = 3000;

// Listening Server 
app.listen(port, () => {
    console.log(`🚀 App Started: http://localhost:${port}`);
});