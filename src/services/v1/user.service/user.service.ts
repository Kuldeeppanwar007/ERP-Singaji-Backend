// Import Models
import { userModel } from "@models/v1/index";

import { generateHash } from "@utils/index";

// Function: Register User
export async function registerUser(payload: any) {
  try {
    console.log(payload);
    // Hash Password
    payload.password = generateHash(payload.password);

    // Create New User
    const user = new userModel(payload);

    // Save in Database
    await user.save();

    // logger.info(`Email: ${payload.email} | Name: ${payload.name}`);
    return user;
  } catch (err) {
    // logger.error(err);
    return false;
  }
}

// Function: Login User
export async function getUserByEmail(email: string) {
  try {
    const user = await userModel.findOne({ email });
    // logger.info('User Found Successfully !')
    return user;
  } catch (err) {
    // logger.error(err);
    return false;
  }
}

// Function: Check Email Exists
export async function checkEmailExists(email: string) {
  try {
    let emailExists = false;
    const user = await userModel.findOne({ email });
    if (user) emailExists = true;
    // logger.info('Email Found Successfully !')
    return emailExists;
  } catch (err) {
    // logger.error(err);
    return false;
  }
}
export async function getAllUsers() {
  try {
    const users = await userModel.find();
    return users;
  } catch (err) {
    console.log(err);
    return false;
  }
}