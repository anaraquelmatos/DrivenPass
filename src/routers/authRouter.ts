import { Router } from "express";
import { SignIn, SignUp } from "../controllers/authController.js";

const auth = Router();

auth.post("/sign-up", SignUp);
auth.post("/sign-in", SignIn);

export default auth;