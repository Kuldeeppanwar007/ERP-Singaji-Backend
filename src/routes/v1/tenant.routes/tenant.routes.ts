// Import packages
import express from "express";

// Import Controllers
import { tenantController } from "@controllers/v1/index";

// Create Router
const router = express.Router();

// Router
router.post("/createTenant", tenantController.createTenant);
router.get("/getTenants", tenantController.getTenants);
router.get("/getTenant/:id", tenantController.getTenantById);
router.patch("/updateTenant/:id", tenantController.updateTenantById);

export default router;
