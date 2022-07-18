import prisma from "../../config/database.js";
import { infoNote } from "../services/noteService.js";

async function findByIdAndTitle(userId: number, title: string) {
    return await prisma.note.findFirst({ where: { userId, title } });
}

async function insert(data: infoNote, userId: number) {
    await prisma.note.create({ data: { title: data.title, annotation: data.annotation, userId } });
}

async function findById(id: number) {
    return await prisma.note.findFirst({ where: { id } });
}

async function findByIdPerUser(id: number, userId: number) {
    return await prisma.note.findFirst({ where: { id, userId } });
}

async function findAllCredentialsPerUser(userId: number) {
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
    findAllCredentialsPerUser,
    deleteById
}

export default noteRepos;