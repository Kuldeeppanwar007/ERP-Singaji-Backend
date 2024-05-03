// Import packages
import { createServer } from "http";

// Import app
import app from "./app.js";

// Import utilities
import { database, logger } from "./utils/index.js";

// Initialize database connection
database.mongooseConnection();

// Create Http Server
const httpServer = createServer(app)

// Define Port
const port = process.env.PORT || 3000;

// Listening Server 
httpServer.listen(port, () => {
    logger.info(`🚀 App Started: http://localhost:${port}`);
});