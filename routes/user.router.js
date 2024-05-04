// Import packages
import express from 'express';

// Import Controllers
import { userController } from '../controllers/index.js'

// Create Router
const router = express.Router();

// ROUTES : RegisterUser
router.post('/register', userController.registerUser);

// ROUTES : LoginUser
router.post('/login', userController.loginUser);

// ROUTES : AllUsers
router.get('/getUsers', userController.getUsers);

export default router;