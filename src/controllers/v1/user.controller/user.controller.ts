import { Request, Response } from 'express';
import { responseMessages } from '../../../config/index.js';
import { jwt, crypto } from '../../../utils/index.js';
import { userService } from '../../../services/v1/index.js';

// UserController
const userController = {
    // Register User
    registerUser: async (req: Request, res: Response) => {
        try {
            const requestData = req.body;
            // Check if email already exists
            if (await userService.checkEmailExists(requestData.email)) {
                console.log("Email Already Exists");
                return res.status(409).json({
                    hasError: true,
                    message: responseMessages.EMAIL_EXISTS,
                });
            }
            // Save User
            const user = await userService.registerUser(requestData);
            console.log(`User Registered Successfully! ${user}`);

            return res.status(201).json({
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
    // Login User
    loginUser: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const user = await userService.getUserByEmail(email);

            if (!user) {
                console.log("User Not Found!");
                return res.status(404).json({
                    hasError: true,
                    message: responseMessages.USER_NOT_FOUND,
                });
            }

            // Validate Hash
            if (user.password) {
                const isHashValid = crypto.validateHash(password, user.password.hash || '', user.password.salt || '');
                if (!isHashValid) {
                    console.log("Incorrect Password");
                    return res.status(401).json({
                        hasError: true,
                        message: responseMessages.INCORRECT_PASSWORD,
                    });
                }
            } else {
                console.log("User password not found");
                return res.status(401).json({
                    hasError: true,
                    message: responseMessages.INCORRECT_PASSWORD,
                });
            }

            // Generate JWT Token
            const jwtToken = jwt.generateJwtToken({ email });
            console.log("User Logged In");

            return res.status(200).json({
                hasError: false,
                message: responseMessages.USER_FOUND,
                data: { token: jwtToken, user },
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                hasError: true,
                message: responseMessages.INTERNAL_SERVER_ERROR,
            });
        }
    },

    // Get All Users
    getUsers: async (req: Request, res: Response) => {
        try {
            const allUsers = await userService.getAllUsers();
            if (!allUsers || allUsers.length === 0) {
                return res.status(404).json({
                    hasError: true,
                    message: responseMessages.USER_NOT_FOUND,
                });
            }
            console.log('All Users Retrieved Successfully');
            return res.status(200).json({
                hasError: false,
                message: responseMessages.USER_FOUND,
                data: allUsers,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                hasError: true,
                message: responseMessages.INTERNAL_SERVER_ERROR,
            });
        }
    },

    // Update User
    updateUser: async (req: Request, res: Response) => {
        try {
            const { email } = req.params;
            const updateData = req.body;

            // Check if the user exists before attempting to update
            const userExists = await userService.checkEmailExists(email);
            if (!userExists) {
                console.log("User not found for update.");
                return res.status(404).json({
                    hasError: true,
                    message: "User not found.",
                });
            }

            const updatedUser = await userService.updateUserByEmail(email, updateData);
            console.log(`User updated successfully: `);
            return res.status(200).json({
                hasError: false,
                message: "User updated successfully.",
                data: updatedUser,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                hasError: true,
                message: "Internal server error.",
            });
        }
    },

    // Delete User
    deleteUser: async (req: Request, res: Response) => {
        try {
            const { email } = req.params;

            // Check if the user exists before attempting to delete
            const userExists = await userService.checkEmailExists(email);
            if (!userExists) {
                console.log("User not found for deletion.");
                return res.status(404).json({
                    hasError: true,
                    message: "User not found.",
                });
            }

            await userService.deleteUserByEmail(email);
            console.log(`User deleted successfully: `);
            return res.status(200).json({
                hasError: false,
                message: "User deleted successfully.",
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                hasError: true,
                message: "Internal server error.",
            });
        }
    },


    // Reset Password
    resetPassword: async (req: Request, res: Response) => {
        try {
            const { email } = req.body;
            // Check if the user exists before attempting to reset the password
            const userExists = await userService.checkEmailExists(email);
            if (!userExists) {
                console.log("User not found for password reset.");
                return res.status(404).json({
                    hasError: true,
                    message: "User not found.",
                });
            }

            // Assuming resetPasswordByEmail initiates the password reset process
            await userService.resetPasswordByEmail(email);

            return res.status(200).json({
                hasError: false,
                message: "Password reset email sent.",
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                hasError: true,
                message: "Internal server error.",
            });
        }
    },


    // Update User Password
    updateUserPassword: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            // Check if the user exists before attempting to update password
            const userExists = await userService.checkEmailExists(email);
            if (!userExists) {
                console.log("User not found for password update.");
                return res.status(404).json({
                    hasError: true,
                    message: "User not found.",
                });
            }

            // Update user password
            await userService.updatePasswordByEmail(email, password);
            console.log(`User password updated successfully: `);
            return res.status(200).json({
                hasError: false,
                message: "User password updated successfully.",
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                hasError: true,
                message: "Internal server error.",
            });
        }
    },
};

export default userController;