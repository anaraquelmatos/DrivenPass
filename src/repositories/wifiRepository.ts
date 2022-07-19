import prisma from "../../config/database.js";
import { infoWifi } from "../services/wifiService.js";

async function findByIdAndTitle(userId: number, title: string) {
    return await prisma.wifi.findFirst({ where: { userId, title } });
}

async function insert(data: infoWifi, userId: number) {
    await prisma.wifi.create({ data: { networkName: data.networkName, title: data.title, 
        password: data.password, userId } });
}

async function findById(id: number) {
    return await prisma.wifi.findFirst({ where: { id } });
}

async function findByIdPerUser(id: number, userId: number) {
    return await prisma.wifi.findFirst({ where: { id, userId } });
}

async function findAllWifisPerUser(userId: number) {
    return await prisma.wifi.findMany({ where: { userId } });
}

async function deleteById(id: number) {
    await prisma.wifi.delete({ where: { id } });
}

const wifiRepos = {
    findByIdAndTitle,
    insert,
    findById,
    findByIdPerUser,
    findAllWifisPerUser,
    deleteById
}

export default wifiRepos;