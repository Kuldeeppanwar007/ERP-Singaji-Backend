// Import Dependencies
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// Import Utilities
// import logger from "./logger.util.js";

// Function: Generate JWT Token
const generateJwtToken = (payload: any) => {
    try {
        console.log(payload);
        const token = jwt.sign({ user: payload }, process.env.JWT_SECRET || "defaultSecretKey", { expiresIn: "1d" });
        return token;
    } catch (err) {
        console.log("Error", err as string); // Cast err to string
        return false;
    }
};

export default { generateJwtToken };