import Joi from "joi";
import { createUser } from "../services/authService.js";

export const userData = Joi.object<createUser>({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required()
})