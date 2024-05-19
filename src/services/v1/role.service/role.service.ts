import { Role } from "@models/v1/index";
import { logger } from "@utils/logger.util";
import { ApiError, ApiResponse } from "@utils/index";

export const createRole = async (roleData: any) => {
  try {
    const newRole = new Role(roleData);
    const savedRole = await newRole.save();
    logger.info("Role created successfully");
    return savedRole; // Return the saved role
  } catch (error) {
    logger.error("Role creation failed:", error);
  }
};

export const getRoleByName = async (roleName: string) => {
  try {
    const roles = await Role.find({ name: roleName });

    if (!roles || roles.length === 0) {
      logger.warn("Role not found");
      return null;
    }

    logger.info("Role fetched successfully");
    return roles;
  } catch (error) {
    logger.error("Error fetching role:", error);
  }
};

export const getRoles = async () => {
  try {
    const roles = await Role.find();
    logger.info("Roles fetched successfully");
    return roles; // Return an array of roles
  } catch (error) {
    logger.error("Error fetching roles:", error);
  }
};
