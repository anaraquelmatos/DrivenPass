import prisma from "../../config/database.js";
import { infoNote } from "../services/noteService.js";

async function findByIdAndTitle(userId: number, title: string) {
    return await prisma.note.findFirst({ where: { userId, title } });
}

async function insert(data: infoNote, userId: number) {
    await prisma.note.create({ data: { title: data.title, annotation: data.annotation, userId } });
}

const noteRepos = {
    findByIdAndTitle,
    insert
}

export default noteRepos;