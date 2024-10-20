import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const ensureAuthentication = (req, res, next) => {
    const auth = req.headers['authorization'];
    if(!auth){
        return res.status(401).json({ message: "Unauthorized, JWT token is require" });
    }
    try {
        const decodeData = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decodeData;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized, JWT token is wrong or expired" });
    }
}