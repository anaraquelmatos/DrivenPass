import { Card } from "@prisma/client";
import cardRepos from "../repositories/cardRepository.js";
import encryptDataUtil from "../utils/encryptDataUtil.js";

import dotenv from "dotenv";
dotenv.config();

export type infoCard = Omit<Card, "id" | "createdAt" | "userId">;
export type infoCardUpdated = Omit<Card, "id" | "createdAt">;

export async function createCard(data: infoCard, userId: number) {

    const confirmDuplicated = await cardRepos.findByIdAndTitle(userId, data.title);

    if (confirmDuplicated) {
        throw {
            type: "conflict",
            message: "This title already exists!"
        }
    }

    const number = await encryptDataUtil.encryptDataCryptr(data.number);

    const securityCode = await encryptDataUtil.encryptDataCryptr(data.securityCode);

    const infoCard = {
        number: number.dataEncrypted,
        printedName: data.printedName,
        securityCode: securityCode.dataEncrypted,
        expirationDate: data.expirationDate,
        password: data.password,
        isVirtual: data.isVirtual,
        type: data.type,
        title: data.title,
        userId
    }

    await insertCard({ ...infoCard });
}

async function insertCard(data: infoCardUpdated) {
    await cardRepos.insert(data);
}

export async function getCard(id: number, userId: number) {

    const answer = await searchForCard(id, userId);

    return answer;
}

async function searchForCard(id: number, userId: number) {

    const searchId = await cardRepos.findById(id);

    if (!searchId) {
        throw {
            type: "not found",
            message: "Card id doesn't exist!"
        }
    }

    const searchIdPerUser = await cardRepos.findByIdPerUser(id, userId);

    if (!searchIdPerUser) {
        throw {
            type: "unauthorized",
            message: "Not authorized!"
        }
    }

    return searchIdPerUser;
}

export async function getCards(userId: number) {

    const allInfos = await searchForCards(userId);

    return allInfos;
}

async function searchForCards(userId: number) {

    const searchIdPerUser = await cardRepos.findAllCardsPerUser(userId);

    if (searchIdPerUser.length === 0) {
        throw {
            type: "not found",
            message: "You don't have registered cards!"
        }
    }

    return searchIdPerUser;
}

export async function deleteCard(id: number, userId: number) {

    const card = await searchForCard(id, userId);

    if (card) {
        await cardRepos.deleteById(id);
    }
}
