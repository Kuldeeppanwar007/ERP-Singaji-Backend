// Import packages
const express = require("express");
const cors = require("cors");

// Import utilities
const { database } = require("./utils");

// Create App
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Initialize database connection
database.mongooseConnection();

// Import Routers
// const { } = require("./routes");

// START: Routes


// END: Routes

module.exports = { app };