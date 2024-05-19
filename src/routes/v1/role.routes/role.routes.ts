import express from "express";
import { Router } from "express";
import { roleController } from "@controllers/v1/index";
// import { authenticate, authorize } from '@middlware/auth';
// import { validateRequest } from '@middlware';

const router: Router = express.Router();

router.post("/create", roleController.createRole);
router.get("/get/:role", roleController.getRoleByName);
router.get("/getAll", roleController.getRoles);

export { router as roleRoutes };
