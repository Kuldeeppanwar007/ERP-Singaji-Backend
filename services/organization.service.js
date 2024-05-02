// Import the organization model
import { organization } from "../models/index.js";

// Define a function for creating an organization
const registerOrganization = async (organizationData) => {

    // Create a new organization instance
    const newOrganization = new organization(organizationData);

    // Save the organization to the database
    const savedOrganization = await newOrganization.save();

    // Return the saved organization
    return savedOrganization;
};

// Define a function for checking if an email exists
const checkIfEmailExists = async (email) => {
    // Find an organization with the given email address
    const newOrganization = await organization.findOne({ organizationEmail: email });

    // If an organization was found, return true
    if (newOrganization) {
        return true;
    }

    // If no organization was found, return false
    return false;
};

// Export the registerOrganization function
export default { registerOrganization, checkIfEmailExists };