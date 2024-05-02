// Import Dependencies
import jwt from "jsonwebtoken";


// Function: Generate JWT Token
const generateJwtToken = (payload) => {
    try {
        console.log(payload)
        const token = jwt.sign({ user: payload }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return token;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export default generateJwtToken;

