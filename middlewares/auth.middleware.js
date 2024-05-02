// Import Dependencies
import jwt from "jsonwebtoken";

// Middleware: Verify Token
const verifyToken = async (req, res, next) => {
    try {
        const tokenHeader = req.headers.authorization;
        if (tokenHeader) {
            const token = tokenHeader.split(" ")[1];
            const { user: { email: userEmail }, } = jwt.verify(token, process.env.JWT_SECRET);
            const user = await userService.getUserByEmail(userEmail);
            req.user = user;
            console.log("Authentication Success");
            return next();
        }
        console.log("Authorization Failed");
        return res.status(403).send({
            hasError: true,
            message: "Authentication Failed!",
        });
    } catch (err) {
        console.log("Authentication Failed!");
        return res.status(403).send({
            hasError: true,
            message: "Authentication Failed!",
        });
    }
};

export default verifyToken