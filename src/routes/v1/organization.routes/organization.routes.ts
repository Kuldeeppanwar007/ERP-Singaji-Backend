// Import packages
import { organizationController } from "@controllers/v1/index";
import express from "express";

// Middlewares
import { tanentConnection } from "middlewares";

// Create Router
const router = express.Router();

// ROUTES : START
router.post("/register", organizationController.registerOrganization);
router.get("/getOrganizations", organizationController.getAllOrganizations);
router.get("/getOrganization/:id", organizationController.getOrganizationById);
// router.patch(
//   "/updateOrganization/:id",
//   organizationController.updateOrganization
// );
// ROUTES : END
export default router;
