import { Request, Response } from "express";
import {
  registerUser,
  getUserByEmail,
  getAllUsers,
  updateUser,
  deleteUser,
  checkUserEmailExists,
} from "@service/v1/index";
import { RESPONSE_MESSAGES } from "@config/responseMessages.config";
import { ApiError, ApiResponse } from "@utils/index";

export const userController = {
  // register user
  registerUser: async (req: Request, res: Response) => {
    try {
      const requestData = req.body;

      if (await checkUserEmailExists(requestData.email)) {
        return res
          .status(409)
          .json(new ApiError(409, RESPONSE_MESSAGES.USERS.ERROR.USER_EXIST));
      }

      const user = await registerUser(requestData);
      return res
        .status(201)
        .json(
          new ApiResponse(201, RESPONSE_MESSAGES.USERS.SUCCESS.CREATE, user)
        );
    } catch (error) {
      return res
        .status(500)
        .json(new ApiError(500, RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR));
    }
  },

  // get user by email
  getUserByEmail: async (req: Request, res: Response) => {
    try {
      const email = req.params.email;
      const user = await getUserByEmail(email);
      if (!user) {
        return res
          .status(404)
          .json(new ApiError(404, RESPONSE_MESSAGES.USERS.ERROR.NOT_FOUND));
      }

      return res.json(
        new ApiResponse(200, RESPONSE_MESSAGES.USERS.SUCCESS.FOUND, user)
      );
    } catch (error) {
      return res
        .status(500)
        .json(new ApiError(500, RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR));
    }
  },

  // get all users
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const users = await getAllUsers();

      if (!users || users.length === 0) {
        return res
          .status(404)
          .json(new ApiError(404, RESPONSE_MESSAGES.USERS.ERROR.NOT_FOUND));
      }

      return res.json(
        new ApiResponse(200, RESPONSE_MESSAGES.USERS.SUCCESS.FOUND, users)
      );
    } catch (error) {
      return res
        .status(500)
        .json(new ApiError(500, RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR));
    }
  },

  // update user
  updateUser: async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const payload = req.body;
      const updatedUser = await updateUser(userId, payload);

      if (!updatedUser) {
        return res
          .status(404)
          .json(new ApiError(404, RESPONSE_MESSAGES.USERS.ERROR.NOT_FOUND));
      }

      return res.json(
        new ApiResponse(
          200,
          RESPONSE_MESSAGES.USERS.SUCCESS.UPDATE,
          updatedUser
        )
      );
    } catch (error) {
      return res
        .status(500)
        .json(new ApiError(500, RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR));
    }
  },

  // delete user
  deleteUser: async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const deletedUser = await deleteUser(userId);

      if (!deletedUser) {
        return res
          .status(404)
          .json(new ApiError(404, RESPONSE_MESSAGES.USERS.ERROR.NOT_FOUND));
      }

      return res.json(
        new ApiResponse(
          200,
          RESPONSE_MESSAGES.USERS.SUCCESS.DELETE,
          deletedUser
        )
      );
    } catch (error) {
      return res
        .status(500)
        .json(new ApiError(500, RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR));
    }
  },
};
