// Import Configerations
import { responseMessages } from '../config/index.js'

// Import Utilities
import { jwt, logger, crypto } from '../utils/index.js';

// Import Services
import { userService } from '../services/index.js'

//

// UserController
const userController = {
    registerUser: async (req, res) => {
        try {
            const requestData = req.body;
            if (await userService.checkEmailExists(requestData.email)) {
                logger.info("Email Already Exists");
                return res.status(200).json({
                    hasError: true,
                    message: responseMessages.EMAIL_EXISTS,
                });
            }
            // Save User
            const user = await userService.registerUser(requestData);
            logger.info(`User Found Successfully ! ${user}`)
            return res.status(200).json({
                hasError: false,
                data: user,
            });
        } catch (err) {
            logger.error(err);
            return res.status(500).json({
                hasError: true,
                message: responseMessages.INTERNAL_SERVER_ERROR,
            });
        }
    },

    // Controller: Login User
    loginUser: async (req, res) => {
        try {
            const userCredential = req.body;
            const user = await userService.getUserByEmail(userCredential.email);

            if (!user) {
                logger.info("User Not Found!");
                return res.status(200).json({
                    hasError: true,
                    message: responseMessages.USER_NOT_FOUND,
                });
            }


            // Validate Hash
            const isHashValid = crypto.validateHash(userCredential.password, user.password.hash, user.password.salt);

            if (!isHashValid) {
                logger.error("Incorrect Password");
                return res.status(400).json({
                    hasError: true,
                    message: responseMessages.INCORRECT_PASSWORD,
                });
            }

            // Generate JWT Token
            const jwtToken = jwt.generateJwtToken({ email: userCredential.email });
            logger.info("User Logged In");
            return res.status(200).json({
                hasError: false,
                message: responseMessages.USER_FOUND,
                data: { token: jwtToken, user: user },
            });
        } catch (err) {
            logger.error(err);
            return res.status(500).json({
                hasError: true,
                message: responseMessages.INTERNAL_SERVER_ERROR,
            });
        }
    },

    // Create a function to get all the users
    getUsers: async (req, res) => {
        try {
            const allUser = userService.getAllUsers();
            if (!allUser) return res.status(400).json({
                hasError: false,
                message: responseMessages.USER_NOT_FOUND,
                data: {}
            });
            logger.info('All User Retrived Successfully');
            return res.status(200).json({
                hasError: false,
                message: responseMessages.USER_FOUND,
                data: allUser
            });
        } catch (err) {
            logger.error(err);
            return res.status(500).json({
                hasError: true,
                message: responseMessages.INTERNAL_SERVER_ERROR,
                data: {}
            });
        }

    }
}


export default userController;