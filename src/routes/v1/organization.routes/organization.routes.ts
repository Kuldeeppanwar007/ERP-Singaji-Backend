import  organizationController  from '../../../controllers/v1/organization.controller/organization.controller.js'
import express from 'express';

// Create Router
const router = express.Router();

// ROUTES : Register
router.post('/register',organizationController.registerOrganization);

export default router;