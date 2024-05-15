// Import Services, Configerations
import {
  checkIfEmailExists,
  registerOrganization,
  getAllOrganization,
  registerUser,
  getOrganizationById,
  updateOrganizationById,
  createAddress,
} from "@service/v1/index";
import { responseMessages } from "@config/index";
import { Request, Response } from "express";
import { generatePassword, logger, ApiError, ApiResponse } from "@utils/index";

// Define a controllers
export const organizationController = {
  // Define a function for creating an organization
  registerOrganization: async (req: Request, res: Response) => {
    try {
      // Get the organization data from the request body
      const organizationData = req.body;

      // Check if the email already exists
      const emailExists = await checkIfEmailExists(
        organizationData.organizationEmail
      );
      // Check and Return if exits
      if (emailExists)
        return res
          .status(400)
          .json(new ApiError(400, responseMessages.EMAIL_EXISTS));
      // Store Address in Address collection
      const newAddress = await createAddress(
        organizationData.organizationAddress
      );
      if (typeof newAddress === "object") {
        organizationData.organizationAddress = newAddress._id;
      }
      // Create the organization
      const newOrganization = await registerOrganization(organizationData);

      if (!newOrganization)
        res
          .status(400)
          .json(new ApiError(400, responseMessages.ORGANIZATION_NOTCREATED));

      logger.info("New Organization Created Successfully !");

      // Send a response with the new organization
      res
        .status(201)
        .json(
          new ApiResponse(
            201,
            newOrganization,
            responseMessages.ORGANIZATION_CREATED_SUCCESSFULLY
          )
        );
    } catch (error) {
      // If an error occurred, send a response with the error message
      logger.error(error);
      res
        .status(500)
        .json(new ApiError(500, responseMessages.INTERNAL_SERVER_ERROR));
    }
  },
  getAllOrganizations: async (req: Request, res: Response) => {
    try {
      // Getting All Organizations
      const allOrganizations = await getAllOrganization();
      console.log(allOrganizations);

      // If no organizations then return data not found
      if (!allOrganizations)
        res
          .status(404)
          .json(new ApiError(404, responseMessages.DATA_NOT_FOUND));

      // Return Response
      return res
        .status(200)
        .json(
          new ApiResponse(200, allOrganizations, responseMessages.DATA_FOUND)
        );
    } catch (error) {
      // If an error occurred, send a response with the error message
      logger.error(error);
      res
        .status(500)
        .json(new ApiError(500, responseMessages.INTERNAL_SERVER_ERROR));
    }
  },
  getOrganizationById: async (req: Request, res: Response) => {
    try {
      const _id: any = req.params.id;
      console.log(_id);

      // Getting All Organizations
      const organization = await getOrganizationById(_id);
      console.log(organization);

      // If no organizations then return data not found
      if (!organization || organization.length == 0)
        return res
          .status(404)
          .json(new ApiError(404, responseMessages.DATA_NOT_FOUND));

      // Return Response
      return res
        .status(200)
        .json(new ApiResponse(200, organization, responseMessages.DATA_FOUND));
    } catch (error) {
      // If an error occurred, send a response with the error message
      logger.error(new Error('ID Mismatch'));
      res
        .status(500)
        .json(new ApiError(500, responseMessages.INTERNAL_SERVER_ERROR));
    }
  },
  updateOrganization: async (req: Request, res: Response) => {
    try {
      console.log("Entered");

      const id: any = req.params;
      const payload = req.body;
      logger.info(id);
      logger.info(payload);

      const updatedOrganization = await updateOrganizationById(id, payload);

      // If no organizations then return data not found
      if (!updatedOrganization)
        res
          .status(404)
          .json(new ApiError(404, responseMessages.DATA_NOT_FOUND));

      // Return Response
      return res
        .status(200)
        .json(
          new ApiResponse(200, updatedOrganization, responseMessages.DATA_FOUND)
        );
    } catch (error) {
      // If an error occurred, send a response with the error message
      logger.error(error);
      res
        .status(500)
        .json(new ApiError(500, responseMessages.INTERNAL_SERVER_ERROR));
    }
  },
};
