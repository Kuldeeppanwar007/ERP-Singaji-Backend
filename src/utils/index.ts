import express from "express";
import cors from "cors";
import organizationRoutes from '../routes/v1/organization.routes/organization.routes.js';
import userRouter from '../routes/v1/user.routes/user.routes.js';
import { connectCentralDB } from "./db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connect to the database
connectCentralDB();

// Routes: Home
app.get('/', (req, res) => {
  res.send('Connected To Server');
});

// Routes: User
app.use('/api/user', userRouter);

// Routes: Organization
app.use('/api/organization', organizationRoutes);


// server listening on port 
app.listen(port, () => {
  console.log(`🚀 App Started: http://localhost:${port}`);
});