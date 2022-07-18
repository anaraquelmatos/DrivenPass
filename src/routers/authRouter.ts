import { Router } from "express";
import { SignIn, SignUp } from "../controllers/authController.js";
import { errorDataUser } from "../middlewares/authMiddleware.js";

const auth = Router();

auth.post("/sign-up", errorDataUser, SignUp);
auth.post("/sign-in", errorDataUser, SignIn);

export default auth;