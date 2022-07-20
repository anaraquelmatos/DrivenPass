import { Request, Response } from "express";
import * as credentialService from "../services/credentialService.js";
import verifyErrorsUtil from "../utils/verifyErrorsUtil.js";

export async function postCredential(req: Request, res: Response) {

    const data: credentialService.infoCredential = req.body;

    const userId: number = res.locals.userId;

    await credentialService.createCredential(data, userId);

    res.sendStatus(201);
}

export async function getCredentialById(req: Request, res: Response) {

    const id = Number(req.params.id);

    const userId: number = res.locals.userId;

    await verifyErrorsUtil.verifyParam(id);

    const data = await credentialService.getCredential(id, userId);

    res.send(data).status(200);
}

export async function getCredentials(req: Request, res: Response) {

    const userId: number = res.locals.userId;

    const data = await credentialService.getCredentials(userId);

    res.send({ credentials: data }).status(200);
}

export async function deleteCredentialById(req: Request, res: Response) {

    const id = Number(req.params.id);

    const userId: number = res.locals.userId;

    await verifyErrorsUtil.verifyParam(id);

    await credentialService.deleteCredential(id, userId);

    res.sendStatus(200);
}


