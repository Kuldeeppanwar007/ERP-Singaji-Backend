// Import Dependencies
import jwt, { Secret } from "jsonwebtoken";
import {logger} from './logger.util'


// Function: Generate JWT Token
export const generateJwtToken = (payload:any) => {
    try {
        console.log(payload)
        const jwt_secret : Secret = <Secret>process.env.JWT_SECRET
        const token = jwt.sign({ user: payload },jwt_secret , { expiresIn: "1d" });
        return token;
    } catch (err) {
         logger.error("Error" +err);
        return false;
    }
}

