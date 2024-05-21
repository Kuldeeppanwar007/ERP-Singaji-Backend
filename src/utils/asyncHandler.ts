import { Request, Response } from "express";
import { ApiError } from "./apiResponse.util";
import { RESPONSE_MESSAGES } from "@config/responseMessages.config";


export const asyncHandler = (fn: Function) => {
  return async (req: Request, res: Response) => {
    try {
      await fn(req, res);
    } catch (error) {
      return res
        .status(500)
        .json(new ApiError(500, RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR));
    }
  };
};
