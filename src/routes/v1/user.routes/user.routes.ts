import userController from '../../../controllers/v1/user.controller/user.controller.js'
import express from 'express'

const router = express.Router()

router.post('/register', userController.registerUser)

export default router
