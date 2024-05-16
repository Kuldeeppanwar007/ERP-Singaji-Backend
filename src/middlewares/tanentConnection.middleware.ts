import { Request, Response, NextFunction } from "express";
import { getTenantDbConnection } from "@utils/index";
import { Organization } from "@models/v1/index";
import { organization } from "@dto/organization.dto";
import dotenv from "dotenv";
dotenv.config();

// Middleware to connect to tenant
export const getTenantConnection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { organizationId } = req.body;

  try {
    // Retrieve Organization with tenantId populated
    const organization = (await Organization.findById(
      organizationId
    )) as organization;

    if (!organization) {
      // Handle missing organization gracefully
      return res
        .status(404)
        .json({ message: `Organization with ID ${organizationId} not found.` });
    }

    // Extract tenant ID
    const tenantId = organization.tenantId;

    // Fetch the tenant database connection
    const tenantDbConnection = await getTenantDbConnection(tenantId);
    next();
    return tenantDbConnection;
  } catch (error) {
    // Log the error for debugging
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
