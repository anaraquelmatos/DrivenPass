import { Note } from "@prisma/client";
import noteRepos from "../repositories/noteRepository.js";

import dotenv from "dotenv";
dotenv.config();

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

export async function getNotes(userId: number) {

    const allInfos = await searchForNotes(userId);

    return allInfos;
}

async function searchForNotes(userId: number) {

    const searchIdPerUser = await noteRepos.findAllNotesPerUser(userId);

    if (searchIdPerUser.length === 0) {
        throw {
            type: "not found",
            message: "You don't have registered notes!"
        }
    }

    return searchIdPerUser;
}

export async function deleteNote(id: number, userId: number) {

    const note = await searchForNote(id, userId);

    if(note){
        await noteRepos.deleteById(id);
    }
}
