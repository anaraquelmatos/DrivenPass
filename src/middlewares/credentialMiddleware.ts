import { NextFunction, Request, Response } from "express";
import { credentialData } from "../schemas/credentialSchema.js";
import * as credentialService from "../services/credentialService.js";

export async function errorDataCredential(req: Request, res: Response, next: NextFunction){

    const data: credentialService.infoCredential = req.body;

    const { error } = credentialData.validate(data, { abortEarly: false });

    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }
    next();
}