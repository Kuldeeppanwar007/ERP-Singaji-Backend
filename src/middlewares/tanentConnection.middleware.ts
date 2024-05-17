import { Request, Response, NextFunction } from "express";
import { getTenantDbConnection } from "@utils/index";

// Middleware to connect to tenant
export const getTenantConnection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { organizationId } = req.body;

  try {
    // Fetch the tenant database connection
    const tenantDbConnection = await getTenantDbConnection(organizationId);
    return tenantDbConnection;
  } catch (error) {
    // Log the error for debugging
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
