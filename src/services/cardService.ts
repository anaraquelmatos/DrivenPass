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

// export async function getNote(id: number, userId: number) {

//     const answer = await searchForNote(id, userId);

//     return answer;
// }

// async function searchForNote(id: number, userId: number) {

//     const searchId = await noteRepos.findById(id);

//     if (!searchId) {
//         throw {
//             type: "not found",
//             message: "Note id doesn't exist!"
//         }
//     }

//     const searchIdPerUser = await noteRepos.findByIdPerUser(id, userId);

//     if (!searchIdPerUser) {
//         throw {
//             type: "unauthorized",
//             message: "Not authorized!"
//         }
//     }

//     return searchIdPerUser;
// }

// export async function getNotes(userId: number) {

//     const allInfos = await searchForNotes(userId);

//     return allInfos;
// }

// async function searchForNotes(userId: number) {

//     const searchIdPerUser = await noteRepos.findAllCredentialsPerUser(userId);

//     if (!searchIdPerUser) {
//         throw {
//             type: "not found",
//             message: "You don't have registered note yet!"
//         }
//     }

//     return searchIdPerUser;
// }

// export async function deleteNote(id: number, userId: number) {

//     const note = await searchForNote(id, userId);

//     if(note){
//         await noteRepos.deleteById(id);
//     }
// }
