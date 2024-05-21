import { Request, Response } from "express";
import { RESPONSE_MESSAGES } from "@config/responseMessages.config";
import { ApiError, ApiResponse, asyncHandler } from "@utils/index";
import {
  registerUser,
  getUserByEmail,
  getAllUsers,
  updateUser,
  deleteUser,
  checkUserEmailExists,
} from "@service/v1/index";

export const userController = {
  // register user
  registerUser: asyncHandler(async (req: Request, res: Response) => {
    const requestData = req.body;

    if (await checkUserEmailExists(requestData.email)) {
      return res
        .status(409)
        .json(new ApiError(409, RESPONSE_MESSAGES.USERS.ERROR.USER_EXIST));
    }

    const user = await registerUser(requestData);
    return res
      .status(201)
      .json(new ApiResponse(201, RESPONSE_MESSAGES.USERS.SUCCESS.CREATE, user));
  }),

  // get user by email
  getUserByEmail: asyncHandler(async (req: Request, res: Response) => {
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
  }),

  // get all users
  getAllUsers: asyncHandler(async (req: Request, res: Response) => {
    const users = await getAllUsers();

    if (!users || users.length === 0) {
      return res
        .status(404)
        .json(new ApiError(404, RESPONSE_MESSAGES.USERS.ERROR.NOT_FOUND));
    }

    return res.json(
      new ApiResponse(200, RESPONSE_MESSAGES.USERS.SUCCESS.FOUND, users)
    );
  }),

  // update user
  updateUser: asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const payload = req.body;
    const updatedUser = await updateUser(userId, payload);

    if (!updatedUser) {
      return res
        .status(404)
        .json(new ApiError(404, RESPONSE_MESSAGES.USERS.ERROR.NOT_FOUND));
    }

    return res.json(
      new ApiResponse(200, RESPONSE_MESSAGES.USERS.SUCCESS.UPDATE, updatedUser)
    );
  }),

  // delete user
  deleteUser: asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const deletedUser = await deleteUser(userId);

    if (!deletedUser) {
      return res
        .status(404)
        .json(new ApiError(404, RESPONSE_MESSAGES.USERS.ERROR.NOT_FOUND));
    }

    return res.json(
      new ApiResponse(200, RESPONSE_MESSAGES.USERS.SUCCESS.DELETE, deletedUser)
    );
  }),
};
