// Import Dependencies
import jwt, { Secret } from "jsonwebtoken";
import { logger } from "@utils/index";
// import userService from "@services/user.service.js";
import {Request,Response,NextFunction} from 'express'

// Middleware: Verify Token
const verifyToken = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const tokenHeader = req.headers.authorization;
        if (tokenHeader) {
            const token = tokenHeader.split(" ")[1];
            const secretKey: Secret = <Secret>(process.env.JWT_SECRET)
            // const { user: { email: userEmail }, } = jwt.verify(token, secretKey);
            // const user = await userService.getUserByEmail(userEmail);
            // req.user = user;
            logger.info("Authentication Success");
            return next();
        }
         logger.error("Authorization Failed");
        return res.status(403).send({
            hasError: true,
            message: "Authentication Failed!",
        });
    } catch (err) {
         logger.error("Authentication Failed!");
        return res.status(403).send({
            hasError: true,
            message: "Authentication Failed!",
        });
    }
};

export default verifyToken