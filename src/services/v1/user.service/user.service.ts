import { User } from "@models/v1/index";
import { UserCreateInput } from "dto/user.dto";
import { logger } from "@utils/index";

// Function: Register User
export async function registerUser(payload: UserCreateInput) {
  try {
    const user = new User(payload);
    await user.save();
    logger.info(user);
    return user;
  } catch (err) {
    logger.error(err);
    throw new Error("Failed to register user");
  }
}

// Function: Get User by Email
export async function getUserByEmail(email: string) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    logger.info("User found successfully !");
    return user;
  } catch (err) {
    logger.error(err);
    throw new Error("Failed to get user by email");
  }
}

// Function: Check Email Exists
export async function checkEmailExists(email: string) {
  try {
    const user = await User.findOne({ email });
    logger.info("Email check completed !");
    return !!user; 
  } catch (err) {
    logger.error(err);
    throw new Error("Failed to check email existence");
  }
}

// Function: Get All Users 
export async function getAllUsers() {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    logger.error(err);
    throw new Error("Failed to get all users");
  }
}

// Function: Update User 
export async function updateUser(
  userId: string,
  payload: UserCreateInput,
) {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, payload, {
      new: true,
    });
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser;
  } catch (err) {
    logger.error(err);
    throw new Error("Failed to update user");
  }
}

// Function: Delete User 
export async function deleteUser(userId: string) {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new Error("User not found");
    }
    return deletedUser;
  } catch (err) {
    logger.error(err);
    throw new Error("Failed to delete user");
  }
}