import * as admin from "firebase-admin";
import { logger } from "@utils/logger.util";
import Admin from "@config/firebase.config";
import { Request, Response, NextFunction } from "express";

Admin.initializeApp;

// signup user
export const signupUser = async (email: string, password: string) => {
  try {
    // Create a new user
    const user = await admin.auth().createUser({
      email,
      password,
    });
    // Return the new user
    logger.info(user);
    return user;
  } catch (error) {
    logger.error(error);
    return false;
  }
};

const verifyUserLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get the user login token from the request
  const token = req.headers.authorization ?? "";
  // Verify the token
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    // Token is valid, proceed with login
    res.json({ message: "Login successful" });
    next();
  } catch (error) {
    // Token is invalid, handle error
    res.status(401).json({ message: "Invalid login token" });
  }
};
