// Import Services, Configerations
import { organizationService } from '../services/index.js'
import { responseMessages } from '../config/index.js';
import { logger } from '../utils/index.js';

// Define a controllers
const organizationController = {
    // Define a function for creating an organization
    registerOrganization: async (req, res) => {
        // console.log("entered");
        try {
            // Get the organization data from the request body
            const organizationData = req.body;

            // Check if the email already exists
            const emailExists = await organizationService.checkIfEmailExists(organizationData.organizationEmail);

            // Check and Return if exits
            if (emailExists) return res.status(400).json({ message: responseMessages.EMAIL_EXISTS });

            // Create the organization
            const newOrganization = await organizationService.registerOrganization(organizationData);

            console.log(newOrganization);
            logger.info('New Organization Created Successfully !');
            // Send a response with the new organization
            res.status(201).json({ hasError: false, message: responseMessages.ORGANIZATION_CREATED_SUCCESSFULLY, data: newOrganization })

        } catch (error) {
            // If an error occurred, send a response with the error message
            logger.error(error);
            res.status(400).json({ message: responseMessages.INTERNAL_SERVER_ERROR });
        }
    },
};

// Export the organizationController object
export default organizationController;