import { Router } from "express";
import { SignIn } from "../controllers/authController.js";

const auth = Router();

auth.post("/sign-up", SignIn);

export default auth;