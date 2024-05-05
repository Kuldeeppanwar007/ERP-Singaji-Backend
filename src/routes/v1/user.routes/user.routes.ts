// Import packages
import express from 'express';

// Import Controllers
import  userController  from '../../../controllers/v1/user.controller/user.controller.js';

// Create Router
const router = express.Router();

// ROUTES : RegisterUser
router.post('/register', userController.registerUser)

// ROUTES : LoginUser
router.post('/login', userController.loginUser);
router.post('/login', userController.loginUser)

// ROUTES : AllUsers
router.get('/getUsers', userController.getUsers)

// ROUTES : UpdateUser
router.put('/updateUser:email', userController.updateUser)

// ROUTES : DeleteUser
router.delete('/deleteUser:email', userController.deleteUser)

// ROUTES : forgatePassword
router.get('/resetPassword', userController.resetPassword)

export default router;