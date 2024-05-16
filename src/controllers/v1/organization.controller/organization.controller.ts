// Import Services, Configerations
import {
  checkOrgEmailExists,
  registerOrganization,
  getOrganizations,
  registerUser,
  getOrganizationById,
  // verifyOrganization,
} from "@service/v1/index";
import { responseMessages } from "@config/index";
import { Request, Response } from "express";
import { generatePassword, logger, ApiError, ApiResponse,sendMail } from "@utils/index";
import { Organization } from "@models/v1/index";
import {admin} from "@config/index"
import { createOrganizationInput, organization } from "@dto/organization.dto";

// Define a controllers
export const organizationController = {
  
  // FUNCTION: Create an organization and send email to the superadmin
  registerOrganization: async (req: Request, res: Response) => {
    try {
      // Get the organization data from the request body
      const {
        organizationName,organizationType,
        organizationEmail,organizationAddress,
        organizationWebsite,organizationPhone,
        affiliations,organizationRegistrationInfo,
        organizationVision,socialMediaProfiles,
        organizationLogo} = <createOrganizationInput>req.body;


      // Check if the email already exists
      const emailExists = await checkOrgEmailExists(organizationEmail);

      // Check and Return if exits
      if (emailExists){
        return res.status(400).json(new ApiError(400, responseMessages.EMAIL_EXISTS));
      }
      // Create the organization
      const newOrganization = await registerOrganization({
        organizationName,organizationType,
        organizationEmail,organizationAddress,
        organizationWebsite,organizationPhone,
        affiliations,organizationRegistrationInfo,
        organizationVision,socialMediaProfiles,
        organizationLogo

      });

      if (!newOrganization){
        res.status(400).json(new ApiError(400, responseMessages.ORGANIZATION_NOTCREATED));
      }

    await sendMail({
          from: `"Nikhil Rajput" <${process.env.EMAIL_USER}>`,
          to: organizationEmail,
          subject: `Welcome to Our Community, ${organizationEmail}! 🎉`,
          text: `Hi ${organizationName},\n\nWelcome to our community! We're thrilled to have you on board. Get ready to explore, connect, and enjoy. If you have any questions or need assistance, feel free to reach out.\n\nCheers,\nThe Team`,
          // html: 'HTML version of the message'
      });
      logger.info("New Organization Created Successfully !");


      // Send a response with the new organization
      res.status(201).json(
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

  // FUNCTION: Verify the organization by superadmin
  // verifyOrganization: async(req:Request, res: Response)=>{
  //   try{

  //     const _id = req.params.id
  //     const requestBody = req.body


  //     const organization: any = await verifyOrganization(_id, requestBody)

  //     console.log(organization.organizationEmail)

  //     const tempPass: string = generatePassword(20);

  //     const user = admin.auth().createUser({
  //       email: organization.organizationEmail,
  //       password:tempPass,
  //       emailVerified: false,
  //       disabled: false 
  //     })

  // return res.status(200).json(new ApiResponse(200, {...organization ,...user}, responseMessages.STATUS_UPDATE))

  //   }catch(error){
  //     logger.error(error);
  //     res
  //       .status(500)
  //       .json(new ApiError(500, responseMessages.INTERNAL_SERVER_ERROR));
  //   }


  // },
  getAllOrganizations: async (req: Request, res: Response) => {
    try {
      // Getting All Organizations
      const allOrganizations = await getOrganizations();
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
      const id: any = req.params;
      // Getting All Organizations
      const allOrganizations = await getOrganizationById(id);

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
}
