// Import packages
import express from 'express';

// Import Controllers
import { organizationController } from '../controllers/index.js'

// Create Router
const router = express.Router();

// ROUTES : Register
router.post('/register', organizationController.registerOrganization);

router.get('/', (req, res) => {
    console.log("Entered");
    res.send('hello')
});

export default router;