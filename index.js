require("dotenv").config();

// Import packages
const http = require("http");

// Import app
const { app } = require("./app");

// Import utilities

const httpServer = http.createServer(app);

const port = process.env.PORT || 3000;

httpServer.listen(port, () => {
    console.log(`🚀 App Started: http://localhost:${port}`);
});