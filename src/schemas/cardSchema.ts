import Joi from "joi";
import { infoCard } from "../services/cardService.js";

export const cardData = Joi.object<infoCard>({
    number: Joi.string().creditCard().required(),
    printedName: Joi.string().required(),
    securityCode: Joi.string().min(3).max(4).required(),
    expirationDate: Joi.string().pattern(/^(0[1-9]|1[0-2])\/(2[2-9])$/).required(),
    password: Joi.string().min(6).max(10).required(),
    isVirtual: Joi.boolean().required(),
    type: Joi.string().pattern(/ ^credit$|^debit$|^creditAndDebit$/).required(),
    title: Joi.string().required()
})