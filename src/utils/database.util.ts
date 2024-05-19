// Import packages
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
import { logger } from "@utils/index";
import { Organization } from "@models/v1/index";
import { ITenant } from "@dto/tenant.dto";

// Define a function to connect to MongoDB using mongoose
export const mongooseConnection = (url: string) => {
  // Set strictQuery to true to enable strict mode
  mongoose.set("strictQuery", true);

  // Connect to MongoDB using the MONGODB_URL environment variable
  mongoose
    .connect(url)
    .then(() => {
      // console.log("Connected to Database");

      logger.info("Connected to Database");
    })
    // If there is an error while connecting, log the error to the console
    .catch((err: Error) => {
      logger.error(err);
    });
};

// TenantDb connection
export const getTenantDbConnection = async (organizationId: string) => {
  const organization = await Organization.findById(organizationId)
    .populate<{ tenantId: ITenant }>("tenantId")
    .exec();

  if (!organization) {
    return null;
  }

  const tenant = organization.tenantId;

  const dbUrl = `mongodb://${tenant.host}:${tenant.port}/${tenant.userName}/${tenant.password}/${tenant.tenantName}`;
  const tenantDb = mongoose
    .createConnection(dbUrl)
    .once("open", () => {
      logger.info("Connected to Database");
    })
    .on("error", (error: Error) => {
      console.log(`Error connecting to database: ${error}`);
    });
  return tenantDb;
};
