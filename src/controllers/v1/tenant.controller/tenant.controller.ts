import { Request, Response } from "express";
import {
  createTenant,
  getTenantById,
  getAllTenants,
  updateTenantById,
  deleteTenantById,
} from "@service/v1/index";
import { ITenant } from "@dto/tenant.dto";
import { RESPONSE_MESSAGES } from "@config/index";
import { ApiResponse, ApiError, asyncHandler } from "@utils/index";

export const tenantController = {
  // Create a new tenant
  createTenant: asyncHandler(async (req: Request, res: Response) => {
    const tenantData = req.body as ITenant;
    const newTenant = await createTenant(tenantData);
    res
      .status(201)
      .json(
        new ApiResponse(201, RESPONSE_MESSAGES.TENANT.SUCCESS.CREATE, newTenant)
      );
  }),

  // Retrieve all tenants
  getAllTenants: asyncHandler(async (req: Request, res: Response) => {
    const tenants = await getAllTenants();
    if (!tenants || tenants.length == 0) {
      return res
        .status(404)
        .json(new ApiError(404, RESPONSE_MESSAGES.TENANT.ERROR.NOT_FOUND));
    }
    res
      .status(200)
      .json(
        new ApiResponse(200, RESPONSE_MESSAGES.TENANT.SUCCESS.FOUND, tenants)
      );
  }),

  // Retrieve tenant by ID
  getTenantById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const tenant = await getTenantById(id);

    if (!tenant) {
      return res
        .status(404)
        .json(new ApiError(404, RESPONSE_MESSAGES.TENANT.ERROR.NOT_FOUND));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, RESPONSE_MESSAGES.TENANT.SUCCESS.FOUND, tenant)
      );
  }),

  // Update tenant by ID
  updateTenantById: asyncHandler(async (req: Request, res: Response) => {
    const tenantId = req.params.id;
    const updatedData = req.body as ITenant;
    const updatedTenant = await updateTenantById(tenantId, updatedData);

    if (!updatedTenant) {
      return res
        .status(404)
        .json(new ApiError(404, RESPONSE_MESSAGES.TENANT.ERROR.NOT_FOUND));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          RESPONSE_MESSAGES.TENANT.SUCCESS.UPDATE,
          updatedTenant
        )
      );
  }),

  // Delete tenant by ID
  deleteTenantById: asyncHandler(async (req: Request, res: Response) => {
    const tenantId = req.params.id;
    const deletedTenant = await deleteTenantById(tenantId);

    if (!deletedTenant) {
      return res
        .status(404)
        .json(new ApiError(404, RESPONSE_MESSAGES.TENANT.ERROR.NOT_FOUND));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, RESPONSE_MESSAGES.TENANT.SUCCESS.DELETE));
  }),
};
