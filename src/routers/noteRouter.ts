import { Router } from "express";
import { postNote, getNoteById, getNotes, deleteNoteById } from "../controllers/noteController.js";
import { errorDataNote } from "../middlewares/noteMiddleware.js";
import { verifyErrorSession } from "../middlewares/sessionMiddleware.js";

const note = Router();

note.post("/create-note", errorDataNote, verifyErrorSession, postNote);
note.get("/note/:id", verifyErrorSession, getNoteById);
note.get("/notes", verifyErrorSession, getNotes);
note.delete("/delete-note/:id", verifyErrorSession, deleteNoteById);

export default note;