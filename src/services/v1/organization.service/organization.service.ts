// Import the organization model
import { organization } from "../../../models/v1/index.js";
// Import Utilities
// import {logger} from "../../../utils/index.js";
// Define a function for creating an organization
const registerOrganization = async (organizationData: { [key: string]: any }): Promise<any> => {
    try {
        // Create a new organization instance
        const newOrganization = new organization(organizationData);

        // Save the organization to the database
        const savedOrganization = await newOrganization.save();

        // Return the saved organization
        return savedOrganization;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Define a function for checking if an email exists
const checkIfEmailExists = async (email: string): Promise<boolean> => {
    try {
        // Find an organization with the given email address
        const organizationFound = await organization.findOne({ organizationEmail: email });

        // If an organization was found, return true
        if (organizationFound) {
            // Assuming tenantConnection is a function that needs to be imported or defined
            // tenantConnection(organizationFound.name);
            return true;
        }

        // If no organization was found, return false
        return false;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Export the registerOrganization and checkIfEmailExists functions
export default { registerOrganization, checkIfEmailExists };