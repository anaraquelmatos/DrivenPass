import Joi from "joi";
import { infoNote } from "../services/noteService.js";

export const noteData = Joi.object<infoNote>({
    title: Joi.string().max(50).required(),
    annotation: Joi.string().max(1000).required()
})