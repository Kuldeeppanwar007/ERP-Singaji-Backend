import userServices from "../../../services/v1/user.service/user.service.js";
import { Request, Response } from "express";

const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await userServices.registerUser(req.body);
    res.status(201).json({ message: `User Registered Successfully! ${user}` });
  } catch (error) {
    res.status(500).json({ message: "Failed to register user", error });
  }
};

export default { registerUser };
