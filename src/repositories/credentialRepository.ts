import { title } from "process";
import prisma from "../../config/database.js";
import { infoInsert } from "../services/credentialService.js";

async function findByIdAndTitle(userId: number, title: string) {
    return await prisma.credential.findFirst({ where: { userId, title } });
}

async function insert(data: infoInsert) {
    await prisma.credential.create({data});
}

async function findById(id: number) {
    return await prisma.credential.findFirst({ where: { id } });
}

async function findByIdPerUser(id: number, userId: number) {
    return await prisma.credential.findFirst({ where: { id, userId } });
}

async function findAllCredentialsPerUser(userId: number) {
    return await prisma.credential.findMany({ where: { userId } });
}

async function deleteById(id: number) {
    await prisma.credential.delete({ where: { id } });
}

const credentialRepos = {
    findByIdAndTitle,
    insert,
    findById,
    findByIdPerUser,
    findAllCredentialsPerUser,
    deleteById
}

export default credentialRepos;