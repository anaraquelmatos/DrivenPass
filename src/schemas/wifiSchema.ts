import Joi from "joi";
import { infoWifi } from "../services/wifiService.js";

export const wifiData = Joi.object<infoWifi>({
    networkName: Joi.string().required(),
    password: Joi.string().min(6).max(10).required(),
    title: Joi.string().required()
})