import { Request, Response } from "express";
import { createRole, getRoleByName, getRoles } from "@service/v1/index";
import { ApiResponse, ApiError, asyncHandler } from "@utils/index";
import { RESPONSE_MESSAGES } from "@config/index";

export const roleController = {
  // create role
  createRole: asyncHandler(async (req: Request, res: Response) => {
    const roleData = req.body;

    const existingRole = await getRoleByName(roleData.name);

    if (existingRole) {
      return res
        .status(409)
        .json(
          new ApiResponse(
            409,
            RESPONSE_MESSAGES.ROLE.ERROR.ROLE_EXIST,
            existingRole
          )
        );
    }

    // Create the role
    const result = await createRole(roleData);

    // Check if the creation was successful
    if (result instanceof ApiError) {
      return res.status(result.statusCode).json(result);
    }

    return res.json(
      new ApiResponse(201, RESPONSE_MESSAGES.ROLE.SUCCESS.CREATE, result)
    );
  }),
  // get role by name
  getRoleByName: asyncHandler(async (req: Request, res: Response) => {
    const name = req.params.role;
    const role = await getRoleByName(name);

    if (!role) {
      return res
        .status(404)
        .json(new ApiError(404, RESPONSE_MESSAGES.ROLE.ERROR.NOT_FOUND));
    }

    return res.json(
      new ApiResponse(200, RESPONSE_MESSAGES.ROLE.SUCCESS.FOUND, role)
    );
  }),
  // get all roles
  getRoles: asyncHandler(async (req: Request, res: Response) => {
    const roles = await getRoles();

    if (!roles || roles.length === 0) {
      return res
        .status(404)
        .json(new ApiError(404, RESPONSE_MESSAGES.ROLE.ERROR.NOT_FOUND));
    }

    return res.json(
      new ApiResponse(200, RESPONSE_MESSAGES.ROLE.SUCCESS.FOUND, roles)
    );
  }),
};
