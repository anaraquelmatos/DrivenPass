import { Wifi } from "@prisma/client";
import wifiRepos from "../repositories/wifiRepository.js";
import encryptDataUtil from "../utils/encryptDataUtil.js";

import dotenv from "dotenv";
dotenv.config();

export type infoWifi = Omit<Wifi, "id" | "createdAt" | "userId">;
export type infoWifiUptaded = Omit<Wifi, "id" | "createdAt">;

export async function createWifi(data: infoWifi, userId: number) {

    const password = await encryptDataUtil.encryptDataCryptr(data.password);

    const infoWifi = {
        networkName: data.networkName,
        password: password.dataEncrypted,
        title: data.title,
        userId
    }

    await insertWifi({...infoWifi});
}

async function insertWifi(data: infoWifiUptaded) {
    await wifiRepos.insert(data);
}

export async function getWifi(id: number, userId: number) {

    const answer = await searchForWifi(id, userId);

    return answer;
}

async function searchForWifi(id: number, userId: number) {

    const searchId = await wifiRepos.findById(id);

    if (!searchId) {
        throw {
            type: "not found",
            message: "Wifi id doesn't exist!"
        }
    }

    const searchIdPerUser = await wifiRepos.findByIdPerUser(id, userId);

    if (!searchIdPerUser) {
        throw {
            type: "unauthorized",
            message: "Not authorized!"
        }
    }

    return searchIdPerUser;
}

export async function getWifis(userId: number) {

    const allInfos = await searchForWifis(userId);

    return allInfos;
}

async function searchForWifis(userId: number) {

    const searchIdPerUser = await wifiRepos.findAllWifisPerUser(userId);

    if (searchIdPerUser.length === 0) {
        throw {
            type: "not found",
            message: "You don't have registered wifis!"
        }
    }

    return searchIdPerUser;
}

export async function deleteWifi(id: number, userId: number) {

    const wifi = await searchForWifi(id, userId);

    if (wifi) {
        await wifiRepos.deleteById(id);
    }
}
