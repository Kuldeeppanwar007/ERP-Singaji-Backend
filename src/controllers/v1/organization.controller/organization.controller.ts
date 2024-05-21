import { Request, Response } from "express";
import { RESPONSE_MESSAGES } from "@config/index";
import { IUser } from "@dto/user.dto";
import {
  ApiResponse,
  ApiError,
  asyncHandler,
  generatePassword,
  logger,
} from "@utils/index";
import {
  checkOrgEmailExists,
  registerOrganization,
  getOrganizations,
  registerOrganizationAdmin,
  updateOrganizationById,
  getOrganizationById,
  sendVerificationEmail,
  sendRejectionEmail,
  createCountry,
  getCountry,
  createAddress,
  getRoleByName,
  checkUserEmailExists,
} from "@service/v1/index";

export const organizationController = {
  // Create a new organization
  registerOrganization: asyncHandler(async (req: Request, res: Response) => {
    const organizationData = req.body;

    const emailExists = await checkOrgEmailExists(
      organizationData.organizationEmail
    );
    if (emailExists) {
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            RESPONSE_MESSAGES.ORGANIZATION.ERROR.ORGANIZATION_EXIST
          )
        );
    }

    // Country Handling
    let country = await getCountry(
      organizationData.organizationAddress.country
    );
    if (!country) {
      country = await createCountry(
        organizationData.organizationAddress.country
      );
    }

    // create address with country id
    if (country && typeof country !== "boolean") {
      organizationData.organizationAddress.country = country._id;
    }
    const newAddress = await createAddress(
      organizationData.organizationAddress
    );
    if (!newAddress) {
      return res
        .status(400)
        .json(new ApiError(400, RESPONSE_MESSAGES.ADDRESS.ERROR.CREATE));
    }

    // Create the organization with the new address ID
    organizationData.organizationAddress = newAddress._id;
    const newOrganization = await registerOrganization(organizationData);

    if (!newOrganization) {
      return res
        .status(400)
        .json(new ApiError(400, RESPONSE_MESSAGES.ORGANIZATION.ERROR.CREATE));
    }

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          RESPONSE_MESSAGES.ORGANIZATION.SUCCESS.CREATE,
          newOrganization
        )
      );
  }),

  // retrieve all organizations
  getAllOrganizations: asyncHandler(async (req: Request, res: Response) => {
    const allOrganizations = await getOrganizations();

    if (!allOrganizations)
      return res.json(
        new ApiError(404, RESPONSE_MESSAGES.ORGANIZATION.ERROR.NOT_FOUND)
      );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          RESPONSE_MESSAGES.ORGANIZATION.SUCCESS.FOUND,
          allOrganizations
        )
      );
  }),

  // retrieve organization by id
  getOrganizationById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const organization = await getOrganizationById(id);

    if (!organization)
      res
        .status(404)
        .json(
          new ApiError(404, RESPONSE_MESSAGES.ORGANIZATION.ERROR.NOT_FOUND)
        );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          RESPONSE_MESSAGES.ORGANIZATION.SUCCESS.FOUND,
          organization
        )
      );
  }),

  // verify organization
  verifyOrganization: asyncHandler(async (req: Request, res: Response) => {
    const organizationId = req.params.id;
    const organizationData = req.body;
    const { tenantId } = organizationData;

    // check if organization exists
    const organization = await getOrganizationById(organizationId);

    // organization not found
    if (!organization) {
      return res.json(
        new ApiError(404, RESPONSE_MESSAGES.ORGANIZATION.ERROR.NOT_FOUND)
      );
    }

    // organization Approval
    if (organizationData.status === "APPROVED") {
      // organization update to APPROVED
      const updateData = {
        status: organizationData.status,
        tenantId: organizationData.tenantId,
      };
      // update organization status & assign tenant
      const updatedOrganization = await updateOrganizationById(
        organizationId,
        updateData
      );
      // organization update failed
      if (!updatedOrganization) return false;
      logger.info("Organization Approved");

      // create a organization admin role
      const role = await getRoleByName("ORGANIZATION_ADMIN");

      // If no role then return false
      if (!role) return false;

      // generate temporary password for organization admin
      const temporaryPassword = generatePassword(10);

      // create user object
      const userData: IUser = {
        name: organization.adminName,
        email: organization.organizationEmail,
        password: temporaryPassword,
        role: role[0]._id,
        organizationId: organization._id,
        tenantId: tenantId,
      };

      // check if user email exists
      const userExist = await checkUserEmailExists(userData.email);

      if (userExist) {
        return res.json(
          new ApiError(409, RESPONSE_MESSAGES.USERS.ERROR.USER_EXIST)
        );
      }

      // register user as organization admin in DB
      const user = await registerOrganizationAdmin(userData);

      // send email for successful verification
      await sendVerificationEmail(userData);

      // return success response
      return res.json(
        new ApiResponse(200, RESPONSE_MESSAGES.ORGANIZATION.SUCCESS.VERIFIED, {
          updatedOrganization,
          user,
        })
      );
    }
    // Organization Rejection
    else if (organizationData.status === "REJECTED") {
      // update organization status to REJECTED
      const updateData = {
        status: organizationData.status,
      };
      // update organization status & assign tenant
      const updatedOrganization = await updateOrganizationById(
        organizationId,
        updateData
      );

      // organization update failed
      if (!updatedOrganization) return false;

      // send email for rejection
      sendRejectionEmail(organization.organizationEmail);

      // return reject response
      return res.json(
        new ApiResponse(
          200,
          RESPONSE_MESSAGES.ORGANIZATION.ERROR.REJECTED,
          organization
        )
      );
    }
  }),
};
