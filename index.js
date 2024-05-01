const http = require("http");
const { app } = require("./app");

// es6 module - require("dotenv").config();

// Import packages

// Import app

// Import utilities

const httpServer = http.createServer(app);

const port = process.env.PORT || 3000;

httpServer.listen(port, () => {
    console.log(`🚀 App Started: http://localhost:${port}`);
});