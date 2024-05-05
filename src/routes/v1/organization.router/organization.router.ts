// Import packages
import { organizationController } from '@controller/v1/index';
import express from 'express';



// Create Router
const router = express.Router();

// ROUTES : Register
router.post('/register', organizationController.registerOrganization);

router.get('/', (req, res) => {
    console.log("Entered");
    res.send('Connected To Server');
});

export  {router as organizationRouter};