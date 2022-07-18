import { Request, Response } from "express";
import * as credentialService from "../services/credentialService.js";

export async function Credential(req: Request, res: Response) {

    const data: credentialService.infoCredential = req.body;

    const userId: number = res.locals.userId;

    await credentialService.createCredential(data, userId);

    res.sendStatus(201);
}