// Import Services, Configerations
import { checkIfEmailExists,registerOrganization } from '@service/v1/index'
import { responseMessages } from '@config/index';
// import { logger } from '../utils/index.js';
import { Request, Response } from 'express';

// Define a controllers
export const organizationController = {
    // Define a function for creating an organization
    registerOrganization: async (req:Request, res:Response) => {
        // console.log("entered");
        try {
            // Get the organization data from the request body
            const organizationData = req.body;

            // Check if the email already exists
            const emailExists = await checkIfEmailExists(organizationData.organizationEmail);

            // Check and Return if exits
            if (emailExists) return res.status(400).json({ message: responseMessages.EMAIL_EXISTS });

            // Create the organization
            const newOrganization = await registerOrganization(organizationData);

            console.log(newOrganization);
            // logger.info('New Organization Created Successfully !');
            // Send a response with the new organization
            res.status(201).json({ hasError: false, message: responseMessages.ORGANIZATION_CREATED_SUCCESSFULLY, data: newOrganization })

        } catch (error) {
            // If an error occurred, send a response with the error message
            // logger.error(error);
            res.status(400).json({ message: responseMessages.INTERNAL_SERVER_ERROR });
        }
    },
};
