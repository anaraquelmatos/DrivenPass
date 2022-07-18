import { Request, Response } from "express";
import * as credentialService from "../services/credentialService.js";

export async function postCredential(req: Request, res: Response) {

    const data: credentialService.infoCredential = req.body;

    const userId: number = res.locals.userId;

    await credentialService.createCredential(data, userId);

    res.sendStatus(201);
}

export async function getCredentialById(req: Request, res: Response) {

    const id = Number(req.params.id);

    const userId: number = res.locals.userId;

    if(!id){
        throw{
            type: "unauthorized",
            message: "Invalid param!"
        }
    }
    
    const data = await credentialService.getCredential(id, userId);

    res.send(data).status(200);
}

