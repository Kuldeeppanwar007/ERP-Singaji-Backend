// Import packages
import express from "express";

// Import Controllers
import { userController } from "@controllers/v1/index";

// Create Router
const router = express.Router();

// Register User
router.post("/register", userController.registerUser);

// get user by email
router.post("/get:email", userController.getUserByEmail);

// GET AllUsers
router.get("/getUsers", userController.getAllUsers);

// update user
router.get("/update:id", userController.getAllUsers);

// delete user
router.get("/delete:id", userController.getAllUsers);

export { router as userRoutes };
