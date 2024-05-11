import express from 'express';
import { addressController } from '@controllers/v1/index';

const router = express.Router();

// Create Address
router.post('/addresses', addressController.createAddress);

// Get Address by ID
router.get('/addresses/:id', addressController.getAddressById);

// Get All Addresses
router.get('/addresses', addressController.getAllAddresses);

// Update Address
router.put('/addresses/:id', addressController.updateAddress);

// Delete Address
router.delete('/addresses/:id', addressController.deleteAddress);

export default router;