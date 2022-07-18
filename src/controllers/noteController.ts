import { Request, Response } from "express";
import { infoNote } from "../services/noteService.js";
import * as noteService from "../services/noteService.js";

export async function postNote(req: Request, res: Response) {

    const data: infoNote = req.body;

    const userId: number = res.locals.userId;

    await noteService.createNote(data, userId);

    res.sendStatus(201);
}

export async function getNoteById(req: Request, res: Response) {

    const id = Number(req.params.id);

    const userId: number = res.locals.userId;

    if(!id){
        throw{
            type: "unauthorized",
            message: "Invalid param!"
        }
    }
    
    const data = await noteService.getNote(id, userId);

    res.send(data).status(200);
}

export async function getNotes(req: Request, res: Response) {

    const userId: number = res.locals.userId;

    const data = await noteService.getNotes(userId);

    res.send({notes: data}).status(200);
}

// export async function deleteCredentialById(req: Request, res: Response) {

//     const id = Number(req.params.id);

//     const userId: number = res.locals.userId;

//     await credentialService.deleteCredential(id, userId);

//     res.sendStatus(200);
// }