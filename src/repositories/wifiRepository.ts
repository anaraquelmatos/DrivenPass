import prisma from "../../config/database.js";
import { infoWifiUptaded } from "../services/wifiService.js";

async function insert(data: infoWifiUptaded) {
    await prisma.wifi.create({data});
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
    insert,
    findById,
    findByIdPerUser,
    findAllWifisPerUser,
    deleteById
}

export default wifiRepos;