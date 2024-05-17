import { Request, Response } from "express";
import {
  registerUser,
  getUserByEmail,
  checkOrgEmailExists,
  getAllUsers,
  updateUser,
  deleteUser,
} from "@service/v1/index";
import { UserCreateInput } from "@dto/user.dto";
import { responseMessages } from "@config/responseMessages.config";
import { logger } from "@utils/index";
import { ApiResponse, ApiError } from "@utils/index";

export const userController = {
  // Register User
  registerUser: async (req: Request, res: Response) => {
    try {
      const requestData = req.body as UserCreateInput;
      // Check if email already exists
      if (await checkOrgEmailExists(requestData.email)) {
        logger.info("Email Already Exists");
        return res.json(new ApiResponse(409, responseMessages.EMAIL_EXISTS));
      }
      // Save User
      const user = await registerUser(requestData);
      logger.info(`User Registered Successfully! ${user}`);

      return res.json(
        new ApiResponse(200, responseMessages.USER_REGISTERED_SUCCESSFULLY)
      );
    } catch (error) {
      logger.error(error);
      return res.json(
        new ApiResponse(500, responseMessages.FAILED_TO_REGISTER_USER)
      );
    }
  },

  // Get User by Email
  getUserByEmail: async (req: Request, res: Response) => {
    try {
      const email = req.params.email;
      const user = await getUserByEmail(email);
      return res.json(
        new ApiResponse(200, responseMessages.USER_FETCHED_SUCCESSFULLY)
      );
    } catch (error) {
      logger.error(error);
      return res.json(
        new ApiResponse(500, responseMessages.FAILED_TO_GET_USER_BY_EMAIL)
      );
    }
  },

  // Get All Users
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const users = await getAllUsers();
      return res.json(
        new ApiResponse(200, responseMessages.USERS_FETCHED_SUCCESSFULLY)
      );
    } catch (error) {
      logger.error(error);
      return res.json(
        new ApiResponse(500, responseMessages.FAILED_TO_GET_ALL_USERS)
      );
    }
  },

  // Update User
  updateUser: async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const payload = req.body;
      const updatedUser = await updateUser(userId, payload);
      return res.json(
        new ApiResponse(200, responseMessages.USER_UPDATED_SUCCESSFULLY)
      );
    } catch (error) {
      logger.error(error);
      return res.json(
        new ApiResponse(500, responseMessages.FAILED_TO_UPDATE_USER)
      );
    }
  },

  // Delete User
  deleteUser: async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const deletedUser = await deleteUser(userId);
      return res.json(
        new ApiResponse(200, responseMessages.USER_DELETED_SUCCESSFULLY)
      );
    } catch (error) {
      logger.error(error);
      return res.json(
        new ApiResponse(500, responseMessages.FAILED_TO_DELETE_USER)
      );
    }
  },
};
