import { Request, Response } from "express";
import { infoCard } from "../services/cardService.js";
import * as cardService from "../services/cardService.js";
import verifyErrors from "../utils/verifyErrorsUtil.js";

export async function postCard(req: Request, res: Response) {

    const data: infoCard = req.body;

    const userId: number = res.locals.userId;

    await cardService.createCard(data, userId);

    res.sendStatus(201);
}

export async function getCardById(req: Request, res: Response) {

    const id = Number(req.params.id);

    const userId: number = res.locals.userId;

    await verifyErrors.verifyParam(id);

    const data = await cardService.getCard(id, userId);

    res.send(data).status(200);
}

export async function getCards(req: Request, res: Response) {

    const userId: number = res.locals.userId;

    const data = await cardService.getCards(userId);

    res.send({ cards: data }).status(200);
}

export async function deleteCardById(req: Request, res: Response) {

    const id = Number(req.params.id);

    const userId: number = res.locals.userId;

    await verifyErrors.verifyParam(id);

    await cardService.deleteCard(id, userId);

    res.sendStatus(200);
}
