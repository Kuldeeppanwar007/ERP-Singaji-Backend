// Import configurations, utilities, and services
import { responseMessages } from '../config/index.js';
import { jwt, logger, crypto,nodeMailer } from '../utils/index.js';
import { userService } from '../services/index.js';

// UserController
const userController = {
    // Register User
    registerUser: async (req, res) => {
        try {
            const requestData = req.body;
            // Check if email already exists
            if (await userService.checkEmailExists(requestData.email)) {
                logger.info("Email Already Exists");
                return res.status(409).json({
                    hasError: true,
                    message: responseMessages.EMAIL_EXISTS,
                });
            }
            // Save User
            const user = await userService.registerUser(requestData);
            logger.info(`User Registered Successfully! ${user}`);

            // Send Welcome Email
            await nodeMailer.sendMail({
                from: `"Nikhil Rajput" <${process.env.EMAIL_USER}>`,
                to: user.email,
                subject: `Welcome to Our Community, ${user.name}! 🎉`,
                text: `Hi ${user.name},\n\nWelcome to our community! We're thrilled to have you on board. Get ready to explore, connect, and enjoy. If you have any questions or need assistance, feel free to reach out.\n\nCheers,\nThe Team`,
                // html: 'HTML version of the message'
            });

            return res.status(201).json({
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

    // Login User
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await userService.getUserByEmail(email);

            if (!user) {
                logger.info("User Not Found!");
                return res.status(404).json({
                    hasError: true,
                    message: responseMessages.USER_NOT_FOUND,
                });
            }

            // Validate Hash
            const isHashValid = crypto.validateHash(password, user.password.hash, user.password.salt);
            if (!isHashValid) {
                logger.error("Incorrect Password");
                return res.status(401).json({
                    hasError: true,
                    message: responseMessages.INCORRECT_PASSWORD,
                });
            }

            // Generate JWT Token
            const jwtToken = jwt.generateJwtToken({ email });
            logger.info("User Logged In");

            // Send Welcome Back Email
            nodeMailer.sendMail({
                from: `"Nikhil Rajput" <${process.env.EMAIL_USER}>`,
                to: user.email,
                subject: `Welcome Back, ${user.name}!`,
                text: `Hi ${user.name},\n\nWe're glad to see you back! If you need any assistance or have any questions, feel free to reach out to us.\n\nBest,\nThe Team`,
                // html: '<p>HTML version of the message</p>'
            });

            return res.status(200).json({
                hasError: false,
                message: responseMessages.USER_FOUND,
                data: { token: jwtToken, user },
            });
        } catch (err) {
            logger.error(err);
            return res.status(500).json({
                hasError: true,
                message: responseMessages.INTERNAL_SERVER_ERROR,
            });
        }
    },

    // Get All Users
    getUsers: async (req, res) => {
        try {
            const allUsers = await userService.getAllUsers();
            if (!allUsers || allUsers.length === 0) {
                return res.status(404).json({
                    hasError: true,
                    message: responseMessages.USER_NOT_FOUND,
                });
            }
            logger.info('All Users Retrieved Successfully');
            return res.status(200).json({
                hasError: false,
                message: responseMessages.USER_FOUND,
                data: allUsers,
            });
        } catch (err) {
            logger.error(err);
            return res.status(500).json({
                hasError: true,
                message: responseMessages.INTERNAL_SERVER_ERROR,
            });
        }
    }
};

export default userController;