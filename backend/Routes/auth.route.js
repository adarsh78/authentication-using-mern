import express from "express";
import { loginValidation, signUpValidation } from "../Middlewares/auth.validation.js";
import { login, signup } from "../Controllers/auth.controller.js";

const router = express.Router();

router.post("/login", loginValidation, login);

router.post("/signup", signUpValidation, signup);

export default router;
