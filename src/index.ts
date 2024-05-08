
import express from 'express'
import  cors from 'cors'

import dotenv from 'dotenv'
dotenv.config()

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
import { organizationRouter,userRouter } from '@routes/v1/index';

// START: Routes
app.use('/api/v1/organization', organizationRouter);
app.use('/api/v1/user', userRouter);

// // Initialize database connection
mongooseConnection();

// Define Port
const port = process.env.PORT || 3000;

// Listening Server 
app.listen(port, () => {
    console.log(`🚀 App Started: http://localhost:${port}`);
});