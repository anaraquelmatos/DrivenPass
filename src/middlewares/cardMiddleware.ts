import { NextFunction, Request, Response } from "express";
import { cardData } from "../schemas/cardSchema.js";
import * as cardService from "../services/cardService.js";

export async function errorDataCard(req: Request, res: Response, next: NextFunction) {

    const data: cardService.infoCard = req.body;

    const { error } = cardData.validate(data, { abortEarly: false });

    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }

    next();
}