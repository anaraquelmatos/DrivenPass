import { Request, Response } from "express";
import { infoNote } from "../services/noteService.js";
import * as noteService from "../services/noteService.js";

export async function postNote(req: Request, res: Response) {

    const data: infoNote = req.body;

    const userId: number = res.locals.userId;

    await noteService.createNote(data, userId);

    res.sendStatus(201);
}