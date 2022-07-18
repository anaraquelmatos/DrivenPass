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

export async function getNote(id: number, userId: number) {

    const answer = await searchForNote(id, userId);

    return answer;
}

async function searchForNote(id: number, userId: number) {

    const searchId = await noteRepos.findById(id);

    if (!searchId) {
        throw {
            type: "not found",
            message: "Note id doesn't exist!"
        }
    }

    const searchIdPerUser = await noteRepos.findByIdPerUser(id, userId);

    if (!searchIdPerUser) {
        throw {
            type: "unauthorized",
            message: "Not authorized!"
        }
    }

    return searchIdPerUser;
}
