// Import Packeges
import bcrypt from 'bcrypt';
// Import Models
import { userModel } from "../models/index.js";

// Function: Register User
async function registerUser(payload) {
    try {
        console.log(payload);
        // Hash Password
        payload.password = await bcrypt.hash(payload.password, 10);

        const user = new userModel(payload);
        await user.save();

        console.log(user);
        return user;
    } catch (err) {
        console.log(err);
        return false;
    }
}

// Function: Login User
async function getUserByEmail(email) {
    try {
        const user = await userModel.findOne({ email });
        return user;
    } catch (err) {
        console.log(err);
        return false;
    }
}

// Function: Check Email Exists
async function checkEmailExists(email) {
    try {
        let emailExists = false;
        const user = await userModel.findOne({ email });
        if (user) emailExists = true;

        return emailExists;
    } catch (err) {
        console.log(err);
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
