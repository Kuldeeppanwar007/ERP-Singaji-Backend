import express from "express";
import { tenantController } from "@controllers/v1/index";
// import { authenticate, authorize } from "@middleware/auth";
const router = express.Router();

// Create tenant
router.post("/create", tenantController.createTenant);

// Get all tenants
router.get("/getall", tenantController.getAllTenants);

// Get tenant by ID
router.get("/get/:id", tenantController.getTenantById);

// Update tenant by ID
router.patch("/update/:id", tenantController.updateTenantById);

// Delete tenant by ID
router.delete("/delete/:id", tenantController.deleteTenantById);

export { router as tennatRoutes };
