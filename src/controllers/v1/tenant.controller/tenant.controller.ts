// Import Services, Configerations
import { responseMessages } from "@config/index";
import { Request, Response } from "express";
import { logger, ApiError, ApiResponse, generateHash } from "@utils/index";
import {
  checkTenantExists,
  createTenant,
  getTenantById,
  getTenants,
  updateTenantById,
} from "@service/v1/index";
import { tenantDto } from "@dto/tenant.dto";
// Define a controller for tenant
export const tenantController = {
  // Create Tenant controller
  createTenant: async (req: Request, res: Response) => {
    try {
      let payload = <tenantDto>req.body;
      // Check tenant exists with UserName
      const existingTenant = await checkTenantExists(
        "userName",
        payload.userName
      );
      if (existingTenant) {
        logger.warn(`Tenant with username ${payload.userName} already exists`);
        return res
          .status(400)
          .json(
            new ApiError(400, responseMessages.ALREADY_EXITS + " with userName")
          );
      }
      // Check tenant exists with port
      const existingTenant1 = await checkTenantExists("port", payload.port);
      if (existingTenant1) {
        logger.warn(`Tenant with port ${payload.port} already exists`);
        return res
          .status(400)
          .json(
            new ApiError(400, responseMessages.ALREADY_EXITS + " with port")
          );
      }

      //Create new Tenant
      const newTenant = await createTenant(payload);
      if (!newTenant) {
        logger.error("Tenant Not Created");
        return res
          .status(400)
          .json(new ApiError(400, responseMessages.NOT_CREATED));
      }
      return res
        .status(201)
        .json(new ApiResponse(201, newTenant, responseMessages.CREATED));
    } catch (error) {
      return res
        .status(500)
        .json(new ApiError(500, responseMessages.INTERNAL_SERVER_ERROR));
    }
  },
  // Get All Tenants controller
  getTenants: async (req: Request, res: Response) => {
    try {
      // Get Tenant By ID
      const allTenants = await getTenants();

      if (!allTenants) {
        return res
          .status(404)
          .json(new ApiError(404, responseMessages.DATA_NOT_FOUND));
      }

      return res
        .status(200)
        .json(new ApiResponse(200, allTenants, responseMessages.DATA_FOUND));
    } catch (error) {
      return res
        .status(500)
        .json(new ApiError(500, responseMessages.INTERNAL_SERVER_ERROR));
    }
  },
  // Get Tenant By Id controller
  getTenantById: async (req: Request, res: Response) => {
    try {
      const _id = req.params.id;

      // Get Tenant By ID
      const tenant = await getTenantById(_id);

      if (!tenant) {
        return res
          .status(404)
          .json(new ApiError(404, responseMessages.DATA_NOT_FOUND));
      }

      return res
        .status(200)
        .json(new ApiResponse(200, tenant, responseMessages.DATA_FOUND));
    } catch (error) {
      return res
        .status(500)
        .json(new ApiError(500, responseMessages.INTERNAL_SERVER_ERROR));
    }
  },
  // Update Tenant By Id controller
  updateTenantById: async (req: Request, res: Response) => {
    try {
      const _id = req.params.id;
      let payload = req.body;

      // Check If Tenant Already Exists
      const tenant = await getTenantById(_id);

      // Check if tenant exists or not
      if (!tenant) {
        logger.error("Id MisMatch");
        return res
          .status(400)
          .json(new ApiError(400, responseMessages.DATA_NOT_FOUND));
      }

      // Update Tenant
      const updatedTenant = await updateTenantById(_id, payload);

      if (!updatedTenant)
        return res
          .status(400)
          .json(new ApiError(400, responseMessages.NOT_UPDATED));

      return res
        .status(201)
        .json(
          new ApiResponse(201, updatedTenant, responseMessages.DATA_UPDATED)
        );
    } catch (error) {
      logger.error(error);
      return res
        .status(500)
        .json(new ApiError(500, responseMessages.INTERNAL_SERVER_ERROR));
    }
  },
};
