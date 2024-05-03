// Import packages
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

// Import Utilities
import logger from "./logger.util.js";

// Define a function to connect to MongoDB using mongoose
function mongooseConnection() {
  // Set strictQuery to true to enable strict mode
  mongoose.set("strictQuery", true);

  // Connect to MongoDB using the MONGODB_URL environment variable
  mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
      logger.info("Connected to Database");
    })
    // If there is an error while connecting, log the error to the console
    .catch((err) => {
      logger.error(err);
    });
}

// Export the mongooseConnection function as the default export
export default { mongooseConnection };