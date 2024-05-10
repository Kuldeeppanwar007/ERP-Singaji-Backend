// Import necessary packages and types
import { Request, Response, NextFunction } from "express";
import { connectTanent } from "@utils/index";
import dotenv from "dotenv";

// Configure environment variables
dotenv.config();

// Middleware to connect to tenant
export const tanentConnection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the organization data from the request body
    const organizationData = req.body;
    console.log(organizationData.organizationName);

    // Connection URL
    let url: string | undefined = process.env.MONGODB_URI;

    // Create a perticuler URL for a Organisation
    const dbName = organizationData.organizationName.replaceAll(" ", "");

    url += dbName;
    console.log(url);

    if (!url) {
      throw new Error("MongoDB URI is not defined in environment variables.");
    }
    const tanentConnection = connectTanent(url, dbName);
    req.body.tanentConnection = tanentConnection;
    next();
  } catch (error) {
    console.error("Error in tenant connection middleware:", error);
    // Forward the error to the error handling middleware
    next(error);
  }
};
