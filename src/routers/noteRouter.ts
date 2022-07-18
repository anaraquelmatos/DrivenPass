import { Router } from "express";
import { postNote } from "../controllers/noteController.js";
import { errorDataNote } from "../middlewares/noteMiddleware.js";
import { verifyErrorSession } from "../middlewares/sessionMiddleware.js";

const note = Router();

note.post("/create-note", errorDataNote, verifyErrorSession, postNote);

export default note;