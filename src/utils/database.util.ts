// Import packages
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
import { logger } from "@utils/index";
import { Tenant } from "@models/v1/tenant.model/tenant.model";
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


// TenantDb connection
export const getTenantDbConnection = async (tenantId: string) => {
  const tenant = await Tenant.findById(tenantId);
  if (tenant) {
    const dbUrl = `mongodb://${tenant.host}:${tenant.port}/${tenant.userName}`;
    const tenantDb = mongoose.createConnection(dbUrl)
      .once('open', () => {
        logger.info("Connected to Database");
      })
      .on('error', (error: Error) => {
        console.log(`Error connecting to database: ${error}`); 
      });
    return tenantDb;
  }
};