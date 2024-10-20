import express from "express";
import { ensureAuthentication } from "../Middlewares/auth.tokenVerification.js";


const router = express.Router();

router.get("/", ensureAuthentication, (req, res) => {
    res.status(200).json([
        {
            name: "mobile",
            price: 10000
        },
        {
            name: "iPhone 13",
            price: 150000
        }
    ])
});
export default router;
