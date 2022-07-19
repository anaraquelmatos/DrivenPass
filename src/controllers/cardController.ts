import { Request, Response } from "express";
import { infoCard } from "../services/cardService.js";
import * as cardService from "../services/cardService.js";

export async function postCard(req: Request, res: Response) {

    const data: infoCard = req.body;

    const userId: number = res.locals.userId;

    await cardService.createCard(data, userId);

    res.sendStatus(201);
}

export async function getCardById(req: Request, res: Response) {

    const id = Number(req.params.id);

    const userId: number = res.locals.userId;

    if(!id){
        throw{
            type: "unauthorized",
            message: "Invalid param!"
        }
    }
    
    const data = await cardService.getCard(id, userId);

    res.send(data).status(200);
}

// export async function getNotes(req: Request, res: Response) {

//     const userId: number = res.locals.userId;

//     const data = await noteService.getNotes(userId);

//     res.send({notes: data}).status(200);
// }

// export async function deleteNoteById(req: Request, res: Response) {

//     const id = Number(req.params.id);

//     const userId: number = res.locals.userId;

//     await noteService.deleteNote(id, userId);

//     res.sendStatus(200);
// }
