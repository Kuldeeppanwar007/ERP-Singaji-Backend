// // Import Dependencies
// import jwt from "jsonwebtoken";
// import { logger } from "../../utils/index.js";

// // Middleware: Verify Token
// const verifyToken = async (req, res, next) => {
//     try {
//         const tokenHeader = req.headers.authorization;
//         if (tokenHeader) {
//             const token = tokenHeader.split(" ")[1];
//             const { user: { email: userEmail }, } = jwt.verify(token, process.env.JWT_SECRET);
//             const user = await userService.getUserByEmail(userEmail);
//             req.user = user;
//             logger.info("Authentication Success");
//             return next();
//         }
//         logger.error("Authorization Failed");
//         return res.status(403).send({
//             hasError: true,
//             message: "Authentication Failed!",
//         });
//     } catch (err) {
//         logger.error("Authentication Failed!");
//         return res.status(403).send({
//             hasError: true,
//             message: "Authentication Failed!",
//         });
//     }
// };

// export default verifyToken