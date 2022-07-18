import Joi from "joi";
import { infoCredential } from "../services/credentialService.js";

export const credentialData = Joi.object<infoCredential>({
    url: Joi.string().pattern(/^https?:\/\/(www\.)[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}$/).required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    title: Joi.string().required()
})