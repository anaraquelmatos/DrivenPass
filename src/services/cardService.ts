import { Card } from "@prisma/client";
import cardRepos from "../repositories/cardRepository.js";

import dotenv from "dotenv";
import Cryptr from "cryptr";
dotenv.config();

export type infoCard = Omit<Card, "id" | "createdAt" | "userId">;

export async function createCard(data: infoCard, userId: number) {

    const confirmDuplicated = await cardRepos.findByIdAndTitle(userId, data.title);

    if (confirmDuplicated) {
        throw {
            type: "conflict",
            message: "This title already exists!"
        }
    }

    const number = await encryptInformation(data.number);

    const securityCode = await encryptInformation(data.securityCode);

    await insertCard({number: number.dataEncrypted, printedName: data.printedName, securityCode: securityCode.dataEncrypted,
    expirationDate: data.expirationDate, password: data.password, isVirtual: data.isVirtual,
    type: data.type, title: data.title}, userId);
}

async function insertCard(data: infoCard, userId: number) {
    await cardRepos.insert(data, userId);
}

async function encryptInformation(info: string) {
    const data = new Cryptr(process.env.KEY);
    const dataEncrypted = data.encrypt(info);
    return {
        dataEncrypted
    };
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

    if(card){
        await cardRepos.deleteById(id);
    }
}
