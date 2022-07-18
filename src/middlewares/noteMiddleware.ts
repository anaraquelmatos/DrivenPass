import { NextFunction, Request, Response } from "express";
import { noteData } from "../schemas/noteSchema.js";
import * as noteService from "../services/noteService.js";

export async function errorDataNote(req: Request, res: Response, next: NextFunction){

    const data: noteService.infoNote = req.body;

    const { error } = noteData.validate(data, { abortEarly: false });

    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }
    next();
}