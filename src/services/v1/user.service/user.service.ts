// Import Models
import { User } from "@models/v1/index";

import { generateHash } from "@utils/index";
import { UserCreateInput } from "@dto/user.dto";
import { logger } from "@utils/index";

// Function: Register User
export async function registerUser(payload: any) {
  try {
    // Create New User
    const user = new User(payload);
    // Save in Database
    await user.save();

    logger.info(`Email: ${payload.email} | Name: ${payload.name}`);
    return user;
  } catch (err) {
    logger.error(err);
    return false;
  }
}

// Function: Login User
export async function getUserByEmail(email: string) {
  try {
    const user = await User.findOne({ email });
    logger.info("User Found Successfully !");
    return user;
  } catch (err) {
    logger.error(err);
    return false;
  }
}

// Function: Check Email Exists
export async function checkUserEmailExists(email: string) {
  try {
    let emailExists = false;
    const user = await User.findOne({ email });
    if (user) emailExists = true;
    logger.info("Email Found Successfully !");
    return emailExists;
  } catch (err) {
    logger.error(err);
    return false;
  }
}
export async function getAllUsers() {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    console.log(err);
    return false;
  }
}
