// Import packages
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const dbUrl: string = process.env.MONGODB_URL || "";
// Define a function to connect to MongoDB using mongoose
async function mongooseConnection() {
    // Set strictQuery to true to enable strict mode
    mongoose.set("strictQuery", true);

    // Connect to MongoDB using the MONGODB_URL environment variable
    try {
        await mongoose.connect(dbUrl);
        console.log("Connected to Database");
    } catch (err) {
        console.error("Error while connecting to database:", err as Error);
        console.log("Connection string:", dbUrl);
    }
}

export default mongooseConnection;
