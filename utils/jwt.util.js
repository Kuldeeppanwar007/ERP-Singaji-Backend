// Import Dependencies
import jwt from "jsonwebtoken";

// Import Utilities
import logger from "./logger.util.js";

// Function: Generate JWT Token
const generateJwtToken = (payload) => {
    try {
        console.log(payload)
        const token = jwt.sign({ user: payload }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return token;
    } catch (err) {
        logger.error("Error", err);
        return false;
    }
}

export default { generateJwtToken };

