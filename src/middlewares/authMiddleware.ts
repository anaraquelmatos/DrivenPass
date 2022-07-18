import { NextFunction, Request, Response } from "express";
import { userData } from "../schemas/authSchema.js";
import * as authService from "../services/authService.js";

export async function errorDataUser(req: Request, res: Response, next: NextFunction){

    const data: authService.infoUser = req.body;

    const { error } = userData.validate(data, { abortEarly: false });

    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }

    next();
}