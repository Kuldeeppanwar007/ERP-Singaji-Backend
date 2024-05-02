// Import packages
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// Define a function to connect to MongoDB using mongoose
function mongooseConnection() {
  // Set strictQuery to true to enable strict mode
  mongoose.set("strictQuery", true);

  // Connect to MongoDB using the MONGODB_URI environment variable
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  })
    .then(() => {
      console.log("Connected to Database");
    })
    // If there is an error while connecting, log the error to the console
    .catch((err) => {
      console.log(err);
    });
}

// Export the mongooseConnection function as the default export
export default { mongooseConnection };