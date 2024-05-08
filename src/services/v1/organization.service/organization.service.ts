// Import the organization model
import { organization } from "@models/v1/index";
import { Organization } from "dto/organization.dto";

// Import Utilities
// import { logger } from "../utils/index.js";

// Define a function for creating an organization
export const registerOrganization = async (organizationData:Organization) => {
    try {

        // Create a new organization instance
        const newOrganization = new organization(organizationData);

        // Save the organization to the database
        const savedOrganization = await newOrganization.save();

        // Return the saved organization
        return savedOrganization;
    } catch (error) {
        // logger.error(error)
        return false;
    }
};

// Define a function for checking if an email exists
export const checkIfEmailExists = async (email:string) => {
    try {
        // Find an organization with the given email address
        const newOrganization = await organization.findOne({ organizationEmail: email });

        // If an organization was found, return true
        if (newOrganization) {
            return true;
        }

        // If no organization was found, return false
        return false;
    } catch (error) {
        // logger.error(error)
        return false
    }
};

