// Import packages
import { organizationController } from "@controllers/v1/index";
import express from "express";

// Middlewares
import { tanentConnection} from "middlewares";;

// const connectTanent = tanentConnection;

// Create Router
const router = express.Router();

// ROUTES : Register
router.post(
  "/register",
  organizationController.registerOrganization
);
router.get("/getall", organizationController.getAllOrganizations);
router.get("/get/:id", organizationController.getOrganizationById);
router.put("/verify", organizationController.verifyOrganization);
export default router;
