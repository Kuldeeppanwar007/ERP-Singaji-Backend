// Import Services, Configerations
import {
  checkOrgEmailExists,
  registerOrganization,
  getOrganizations,
  registerOrganizationAdmin,
  updateOrganizationById,
  getOrganizationById,
  sendVerificationEmail,
  sendRejectionEmail,
  getCountry,
  registerUser,
  createAddress,
  updateAddressById,
} from "@service/v1/index";
import { responseMessages } from "@config/index";
import { Request, Response } from "express";
import { generatePassword, logger, ApiError, ApiResponse } from "@utils/index";
import { organization } from "@dto/organization.dto";
import { Tenant } from "@models/v1/tenant.model/tenant.model";
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

  verifyOrganization: async (req: Request, res: Response) => {
    try {
      const { organizationId, status, tenantName }  = <organization>req.body;

      const tenant = await Tenant.findOne({ tenantName: tenantName });
      const tenantId = tenant ? tenant._id : null;

      const Organization = await getOrganizationById(organizationId);

      // If no organizations then return data not found
      if (!Organization)
        return res.json(new ApiError(404, responseMessages.DATA_NOT_FOUND));

      // Send email notification based on status
      if (status === "APPROVED") {
        // Update the organization status & Assign a tenantDB
        const updatedOrganization = await updateOrganizationById(
          organizationId,
          { status, tenantId }
        );

        if (!updatedOrganization) return false;

        logger.info("Organization Verified Successfully");

        // create organization admin
        const temporaryPassword: string = generatePassword(10);
        const user = {
          name: Organization.adminName,
          email: Organization.organizationEmail,
          password: temporaryPassword,
          role: "ADMIN",
          organizationId: Organization._id,
          tenantId: tenantId,
        };
        // Register the organization Admin
        const User = await registerOrganizationAdmin(user);
        
        // send email to organization admin
        await sendVerificationEmail(user);

        // Return success response
        return res
          .status(200)
          .json(
            new ApiResponse(
              200,
              { updatedOrganization, User },
              responseMessages.ORGANIZATION_VERIFIED
            )
          );
      } else if (status === "REJECTED") {
        // Send rejection email
        sendRejectionEmail(Organization.organizationEmail);
      }
    } catch (error) {
      logger.error(error);
      res
        .status(500)
        .json(new ApiError(500, responseMessages.INTERNAL_SERVER_ERROR));
    }
  },
};
