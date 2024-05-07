// Import Services, Configerations
import organizationService from "../../../services/v1/organization.service/organization.service.js";
import { Request, Response } from "express";

const registerOrganization = async (req: Request, res: Response) => {
  try {
    // Call the service function for creating an organization
    const organization = await organizationService.registerOrganization(
      req.body
    );
    // Send the response
    res.status(201).json(organization);
  } catch (error: any) {
    // Explicitly type 'error' as 'any'
    // Send the error response
    res.status(400).json({ message: error.message });
  }
};
// Export the organizationController object
export default { registerOrganization };
