// Import Configerations
import { responseMessages } from '../config/index.js'

// Import Utilities
import { jwt } from '../utils/index.js';

// Import Services
import { userService } from '../services/index.js'


// UserController
const userController = {
    registerUser: async (req, res) => {
        try {
            const requestData = req.body;
            if (await userService.checkEmailExists(requestData.email)) {
                console.log("Email Already Exists");
                return res.status(200).json({
                    hasError: true,
                    message: responseMessages.EMAIL_EXISTS,
                });
            }

            // Save User
            const user = await userService.registerUser(requestData);
            return res.status(200).json({
                hasError: false,
                data: user,
            });
        } catch (err) {
            console.log(err);
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
                console.log("User Not Found!");
                return res.status(200).json({
                    hasError: true,
                    message: responseMessages.USER_NOT_FOUND,
                });
            }

            // Validate Hash
            if (!isHashValid) {
                console.log("Incorrect Password");
                return res.status(400).json({
                    hasError: true,
                    message: responseMessages.INCORRECT_PASSWORD,
                });
            }

            // Generate JWT Token
            const jwtToken = jwt.generateJwtToken({ email: userCredential.email });
            console.log("User Logged In");
            return res.status(200).json({
                hasError: false,
                message: responseMessages.USER_FOUND,
                data: { token: jwtToken, user: user },
            });
        } catch (err) {
            console.log(err);
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
            return res.status(200).json({
                hasError: false,
                message: responseMessages.USER_FOUND,
                data: allUser
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                hasError: true,
                message: responseMessages.INTERNAL_SERVER_ERROR,
                data: {}
            });
        }

    }
}


export default userController;