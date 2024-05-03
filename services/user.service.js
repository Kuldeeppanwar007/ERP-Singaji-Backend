// Import Packeges
import bcrypt from 'bcrypt';
// Import Models
import { userModel } from "../models/index.js";

// Import Utilities
import {logger} from "../utils/index.js";

// Function: Register User
async function registerUser(payload) {
    try {
        console.log(payload);
        // Hash Password
        payload.password = await bcrypt.hash(payload.password, 10);

        const user = new userModel(payload);
        await user.save();

        logger.info(`Email: ${payload.email} | Name: ${payload.name}`);
        return user;
    } catch (err) {
        logger.error(err);
        return false;
    }
}

// Function: Login User
async function getUserByEmail(email) {
    try {
        const user = await userModel.findOne({ email });
        logger.info('User Found Successfully !')
        return user;
    } catch (err) {
        logger.error(err);
        return false;
    }
}

// Function: Check Email Exists
async function checkEmailExists(email) {
    try {
        let emailExists = false;
        const user = await userModel.findOne({ email });
        if (user) emailExists = true;
        logger.info('Email Found Successfully !')
        return emailExists;
    } catch (err) {
        logger.error(err);
        return false;
    }
}
async function getAllUsers() {
    try {
        const users = await userModel.find();
        return users;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export default {
    registerUser,
    checkEmailExists,
    getUserByEmail,
    getAllUsers
}
