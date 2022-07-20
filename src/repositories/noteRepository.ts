import prisma from "../../config/database.js";
import { infoNoteUptaded } from "../services/noteService.js";

async function findByIdAndTitle(userId: number, title: string) {
    return await prisma.note.findFirst({ where: { userId, title } });
}

async function insert(data: infoNoteUptaded) {
    await prisma.note.create({ data });
}

async function findById(id: number) {
    return await prisma.note.findFirst({ where: { id } });
}

async function findByIdPerUser(id: number, userId: number) {
    return await prisma.note.findFirst({ where: { id, userId } });
}

async function findAllNotesPerUser(userId: number) {
    return await prisma.note.findMany({ where: { userId } });
}

async function deleteById(id: number) {
    await prisma.note.delete({ where: { id } });
}

const noteRepos = {
    findByIdAndTitle,
    insert,
    findById,
    findByIdPerUser,
    findAllNotesPerUser,
    deleteById
}

export default noteRepos;