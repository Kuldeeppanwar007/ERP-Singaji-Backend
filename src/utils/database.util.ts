// Import packages
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

// Import Utilities

// Define a function to connect to MongoDB using mongoose
export const mongooseConnection = (url: string) => {
  console.log(url);

  // Set strictQuery to true to enable strict mode
  mongoose.set("strictQuery", true);

  // Connect to MongoDB using the MONGODB_URL environment variable
  mongoose
    .connect(url)
    .then(() => {
      console.log("Connected");
      // logger.info("Connected to Database");
    })
    // If there is an error while connecting, log the error to the console
    .catch((err: Error) => {
      // logger.error(err);
    });
};

export const connectTanent = (url: string, tanentDbName: string) => {
  console.log(url);

  // Set strictQuery to true to enable strict mode
  mongoose.set("strictQuery", true);

  // Connect to MongoDB using the MONGODB_URL environment variable
  const tanentDb = mongoose.createConnection(url);
  // Check for connection errors
  tanentDb.on(
    "error",
    console.error.bind(console, "Tanent DB connection error:")
  );
  tanentDb.once("open", () => {
    console.log(`Connected to ${tanentDbName}`);
  });
  return tanentDb;
};
