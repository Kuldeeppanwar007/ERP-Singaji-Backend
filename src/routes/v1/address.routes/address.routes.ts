import express from "express";
import { addressController } from "@controllers/v1/index";

const router = express.Router();

// Create Address
router.post("/add", addressController.createAddress);

// Get Address by ID
router.get("/getAddress/:id", addressController.getAddressById);

// Get All Addresses
router.get("/getAddress", addressController.getAllAddresses);

// Update Address
router.patch("/updateAddress/:id", addressController.updateAddressById);

// Delete Address
router.delete("/deleteAddress/:id", addressController.deleteAddressById);

export { router as addressRoutes };
