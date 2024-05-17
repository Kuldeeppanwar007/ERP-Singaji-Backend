import { Request, Response } from "express";
import { createRole, getRoles } from "@service/v1/index";
import { ApiResponse, ApiError } from "@utils/index";
import {responseMessages} from "@config/index";

export const roleController = {
  createRole: async (req: Request, res: Response) => {
    const { organizationId, roleData } = req.body;
    try {
      const newRole = await createRole(organizationId, roleData);
      res
        .status(201)
        .json(
          new ApiResponse(
            201,
            responseMessages.ROLE_CREATED_SUCCESSFULLY,
            newRole
          )
        );
    } catch (err) {
      res.status(500).json(new ApiError(500, (err as Error).message));
    }
  },

  getRoles: async (req: Request, res: Response) => {
    const { organizationId } = req.params;
    try {
      const roles = await getRoles(organizationId);
      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            responseMessages.ROLES_FETCHED_SUCCESSFULLY,
            roles
          )
        );
    } catch (err) {
      res.status(500).json(new ApiError(500, (err as Error).message));
    }
  },
};
