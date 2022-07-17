import { Router } from "express";
import { SignUp } from "../controllers/authController.js";

const auth = Router();

auth.post("/sign-up", SignUp);

export default auth;