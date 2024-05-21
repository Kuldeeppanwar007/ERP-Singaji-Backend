import express from "express";
import { tenantController } from "@controllers/v1/index";
// import { authenticate, authorize } from "@middleware/auth";
const router = express.Router();

// Create tenant
router.post("/", tenantController.createTenant);

// Get all tenants
router.get("/", tenantController.getAllTenants);

// Get tenant by ID
router.get("/:id", tenantController.getTenantById);

// Update tenant by ID
router.put("/:id", tenantController.updateTenantById);

// Delete tenant by ID
router.delete("/:id", tenantController.deleteTenantById);

export { router as tennatRoutes };
