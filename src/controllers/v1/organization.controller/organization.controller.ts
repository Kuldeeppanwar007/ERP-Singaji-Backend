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
  createAddress,
  updateAddressById,
} from "@service/v1/index";
import { responseMessages } from "@config/index";
import { Request, Response } from "express";
import {
  generatePassword,
  logger,
  ApiError,
  ApiResponse,
  sendMail,
} from "@utils/index";
import { organization } from "@dto/organization.dto";
import { Tenant } from "@models/v1/tenant.model/tenant.model";
// Define a controllers
export const organizationController = {
  // FUNCTION: Create an organization and send email to the superadmin
  registerOrganization: async (req: Request, res: Response) => {
    try {
      // Get the organization data from the request body
      const organizationData = req.body;
      const organizationAddressCopy = structuredClone(
        organizationData.organizationAddress
      );
      // Check if the email already exists
      const emailExists = await checkOrgEmailExists(
        organizationData.organizationEmail
      );

      // Check and Return if exits
      if (emailExists) {
        logger.error("Email already exists");
        return res
          .status(400)
          .json(new ApiError(400, responseMessages.EMAIL_EXISTS));
      }
      // Get Country's ObjectId
      const country = await getCountry(
        organizationData.organizationAddress.country
      );

      // Check country are exists or not
      if (!country) {
        logger.error("Country Not Found");
        return res
          .status(404)
          .json(new ApiError(404, responseMessages.COUNTRY_NOT_FOUND));
      }
      // if Country are an object then get {_id} from this object and set into address's country
      if (typeof country === "object") {
        organizationData.organizationAddress.country = country._id;
      }

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
        return res
          .status(400)
          .json(new ApiError(400, responseMessages.ORGANIZATION_NOTCREATED));

      logger.info("New Organization Created Successfully !");

      // Send Mail Of Successfully Registration
      const status = sendMail({
        from: `<${process.env.EMAIL_USER}>`,
        to: process.env.SUPER_ADMIN_EMAIL,
        subject: "Organization Registeration",
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Organization Registration Confirmation</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border: 1px solid #dddddd;
                    border-radius: 5px;
                }
                h1 {
                    text-align: center;
                    color: #333333;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                }
                table, th, td {
                    border: 1px solid #dddddd;
                }
                th, td {
                    padding: 12px;
                    text-align: left;
                }
                th {
                    background-color: #f2f2f2;
                }
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    color: #777777;
                    font-size: 12px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>New Organization Registration</h1>
                <p>Dear Super Admin,</p>
                <p>A new organization has been registered. Here are the details:</p>
                <table>
                    <tr>
                        <th>Organization Name</th>
                        <td><strong>${organizationData.organizationName}<strong/></td>
                    </tr>
                    <tr>
                        <th>Type</th>
                        <td>${organizationData.organizationType}</td>
                    </tr>
                    <tr>
                        <th>Admin Name</th>
                        <td>${organizationData.adminName}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td><strong>${organizationData.organizationEmail}<strong/></td>
                    </tr>
                    <tr>
                    <th>Phone</th>
                    <td>${organizationData.organizationPhone}</td>
                    </tr>

                    <tr>
                        <th>Plan Type</th>
                        <td>${organizationData.planType}</td>
                    </tr>
                    <tr>
                        <th>Website</th>
                        <td>${organizationData.organizationWebsite}</td>
                    </tr>
                    <tr>
                        <th>Address</th>
                        <td>Street : ${organizationAddressCopy.street}<br>City : ${organizationAddressCopy.city} <br>District : ${organizationAddressCopy.district} <br>Pincode : ${organizationAddressCopy.pincode}<br>State : ${organizationAddressCopy.state} <br>Country : ${organizationAddressCopy.country}</td>
                    </tr>
                </table>
                <p>If you have any questions, feel free to contact us.</p>
                <p>Best Regards,<br>Singa ji</p>
                <div class="footer">
                    &copy; 2024 Your Company. All rights reserved.
                </div>
            </div>
        </body>
        </html>

      `,
      });
      if (!status) {
        logger.error("Mail Not send");
      }
      // Send a response with the new organization
      return res
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
      return res
        .status(500)
        .json(new ApiError(500, responseMessages.INTERNAL_SERVER_ERROR));
    }
  },
  getAllOrganizations: async (req: Request, res: Response) => {
    try {
      // Getting All Organizations
      const allOrganizations = await getOrganizations();

      // If no organizations then return data not found
      if (!allOrganizations)
        return res
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
      return res
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
      if (!organization)
        return res
          .status(404)
          .json(new ApiError(404, responseMessages.DATA_NOT_FOUND));

      // Return Response
      return res
        .status(200)
        .json(new ApiResponse(200, organization, responseMessages.DATA_FOUND));
    } catch (error) {
      // If an error occurred, send a response with the error message
      logger.error(new Error("ID Mismatch"));
      return res
        .status(500)
        .json(new ApiError(500, responseMessages.INTERNAL_SERVER_ERROR));
    }
  },
  updateOrganization: async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const payload = req.body;
      console.log(payload);

      // Geting Org By Id
      const organization = await getOrganizationById(id);

      logger.info(organization);
      // Check if Organization is not exists then return
      if (!organization) {
        logger.error(responseMessages.DATA_NOT_FOUND);
        return res
          .status(404)
          .json(new ApiError(404, responseMessages.DATA_NOT_FOUND));
      }

      // Address update Code
      if (payload?.organizationAddress) {
        const addressId = organization.organizationAddress?.toString();
        console.log(addressId);

        const updatedAddress = await updateAddressById(
          addressId,
          payload.organizationAddress
        );
        // Check If Address not update
        if (!updatedAddress) {
          logger.error("Address Not Update");
          return res
            .status(400)
            .json(new ApiError(400, responseMessages.NOT_UPDATED));
        }
        payload.organizationAddress = updatedAddress._id;
      }
      // Update Organization
      const updatedOrganization = await updateOrganizationById(id, payload);

      // Check If Organization not updated
      if (!updatedOrganization) {
        return res
          .status(400)
          .json(new ApiError(400, responseMessages.NOT_UPDATED));
      }
      // If organization update then a mail goes to Organization Admin
      // Send Mail Of Successfully Registration
      const status = sendMail({
        from: `<${process.env.EMAIL_USER}>`,
        to: process.env.SUPER_ADMIN_EMAIL,
        subject: "Organization Registeration",
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Organization Update</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border: 1px solid #dddddd;
                    border-radius: 5px;
                }
                h1 {
                    text-align: center;
                    color: #333333;
                }
                h2 {
                    text-align: center;
                    color: #007BFF;
                    margin-top: 0;
                }
                p {
                    line-height: 1.6;
                    color: #555555;
                }
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    color: #777777;
                    font-size: 12px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Organization Update</h1>
                <h2>${organization.organizationName}</h2>
                <p>Dear Admin,${organization.adminName} ,</p>
                <p>We would like to inform you that there have been updates to your organization</p>
                <p>If you have any questions, feel free to contact us.</p>
                <p>Best Regards,<br>Singa ji</p>
                <div class="footer">
                    &copy; 2024 Your Company. All rights reserved.
                </div>
            </div>
        </body>
        </html>
        `,
      });
      // Send Response
      return res
        .status(200)
        .json(
          new ApiResponse(
            201,
            updatedOrganization,
            responseMessages.DATA_UPDATED
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
  verifyOrganization: async (req: Request, res: Response) => {
    try {
      const { organizationId, status, tenantId } = <organization>req.body;

      // const tenant = await Tenant.findOne({ tenantName: tenantName });
      // const tenantId = tenant ? tenant._id : null;

      const Organization = await getOrganizationById(organizationId);

      // If no organizations then return data not found
      if (!Organization)
        return res
          .status(404)
          .json(new ApiError(404, responseMessages.DATA_NOT_FOUND));

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
