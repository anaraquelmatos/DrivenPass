import Joi from "joi";
import { infoUser } from "../services/authService.js";

export const userData = Joi.object<infoUser>({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required()
})