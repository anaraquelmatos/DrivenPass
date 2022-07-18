import { Note } from "@prisma/client";
import noteRepos from "../repositories/noteRepository.js";

// dotenv.config();

export type infoNote = Omit<Note, "id" | "createdAt" | "userId">;

export async function createNote(data: infoNote, userId: number) {

    const confirmDuplicated = await noteRepos.findByIdAndTitle(userId, data.title);

    if (confirmDuplicated) {
        throw {
            type: "conflict",
            message: "This title already exists!"
        }
    }

    await insertNote(data,userId);    
}

async function insertNote(data: infoNote, userId: number) {
    await noteRepos.insert(data, userId);
}
