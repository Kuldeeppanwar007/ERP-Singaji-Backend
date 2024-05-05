import { Request, Response } from "express";
import { organizationService } from "../../../services/v1/index.js";
import responseMessages from "../../../config/responseMessages.config.js";
// import logger from "../../../utils/logger.util.js";

// Import Services, Configurations

// Define the organizationController object
const organizationController = {
    // Define a function for creating an organization
    registerOrganization: async (req: Request, res: Response) => {
        try {
            // Get the organization data from the request body
            const organizationData = req.body;

            // Check if the email already exists
            const emailExists = await organizationService.checkIfEmailExists(
                organizationData.organizationEmail
            );

            // Check and return if it exists
            if (emailExists) {
                return res.status(400).json({ message: responseMessages.EMAIL_EXISTS });
            }

            // Create the organization
            const newOrganization = await organizationService.registerOrganization(
                organizationData
            );

            console.log(newOrganization);
            console.log("New Organization Created Successfully!");

            // Send a response with the new organization
            res.status(201).json({
                hasError: false,
                message: responseMessages.ORGANIZATION_CREATED_SUCCESSFULLY,
                data: newOrganization,
            });
        } catch (error) {
            // If an error occurred, send a response with the error message
            console.log(error);
            res.status(400).json({ message: responseMessages.INTERNAL_SERVER_ERROR });
        }
    },
};

// Export the organizationController object
export default organizationController;