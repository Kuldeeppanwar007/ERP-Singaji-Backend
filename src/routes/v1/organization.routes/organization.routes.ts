// Import packages
import { organizationController } from "@controllers/v1/index";
import express from "express";

// Middlewares

// Create Router
const router = express.Router();

router.post("/register", organizationController.registerOrganization);

router.put("/verify", organizationController.verifyOrganization);

router.get("/getOrganizations", organizationController.getAllOrganizations);

router.get("/getOrganization/:id", organizationController.getOrganizationById);

// router.patch(
//   "/updateOrganization/:id",
//   organizationController.updateOrganization
// );

export  {router as organizationRoutes};
