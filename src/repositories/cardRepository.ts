import prisma from "../../config/database.js";
import { infoCard } from "../services/cardService.js";

async function findByIdAndTitle(userId: number, title: string) {
    return await prisma.card.findFirst({ where: { userId, title } });
}

async function insert(data: infoCard, userId: number) {
    await prisma.card.create({
        data: {
            number: data.number,
            printedName: data.printedName,
            securityCode: data.securityCode,
            expirationDate: data.expirationDate,
            password: data.password,
            isVirtual: data.isVirtual,
            type: data.type,
            title: data.title,
            userId
        }
    });
}

async function findById(id: number) {
    return await prisma.card.findFirst({ where: { id } });
}

async function findByIdPerUser(id: number, userId: number) {
    return await prisma.card.findFirst({ where: { id, userId } });
}

async function findAllCardsPerUser(userId: number) {
    return await prisma.card.findMany({ where: { userId } });
}

async function deleteById(id: number) {
    await prisma.card.delete({ where: { id } });
}

const cardRepos = {
    findByIdAndTitle,
    insert,
    findById,
    findByIdPerUser,
    findAllCardsPerUser,
    deleteById
}

export default cardRepos;