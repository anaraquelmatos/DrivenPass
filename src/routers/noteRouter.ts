import { Router } from "express";
import { postNote, getNoteById, getNotes } from "../controllers/noteController.js";
import { errorDataNote } from "../middlewares/noteMiddleware.js";
import { verifyErrorSession } from "../middlewares/sessionMiddleware.js";

const note = Router();

note.post("/create-note", errorDataNote, verifyErrorSession, postNote);
note.get("/note/:id", verifyErrorSession, getNoteById);
note.get("/notes", verifyErrorSession, getNotes);

export default note;