import mongoose from "mongoose";
import dotenv from "dotenv";
import OrganizationModel from "../models/v1/organization.model/organization.model.js";

dotenv.config();

const centralDBUrl = process.env.MONGODB_URL || "";

const connectCentralDB = async () => {
  try {
    await mongoose.connect(centralDBUrl);
    console.log("Central Database Connected Successfully !");
  } catch (error) {
    console.error("Central Database Connection Failed !");
    throw error;
  }
};

const connectOrganizationDB = async (organizationURL: string) => {
  try {
    const connection = mongoose.createConnection(organizationURL);
    await new Promise((resolve, reject) => {
      connection.on("connected", resolve);
      connection.on("error", reject);
    });
    console.log("Organization Database Connected Successfully !");
    return connection;
  } catch (error) {
    console.error("Organization Database Connection Failed !");
    throw error;
  }
};

const findOrganization = async (email: string) => {
  try {
    const organization = await OrganizationModel.findOne({ email: email });
    if (organization) {
      console.log("Organization Found !");
      return organization;
    }
    console.log("Organization Not Register !");
    
  } catch (error) {
    console.error("Error finding organization", error);
    return false;
  }
};

export { connectCentralDB, connectOrganizationDB, findOrganization };
