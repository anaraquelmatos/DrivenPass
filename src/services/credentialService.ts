import { Credential } from "@prisma/client";
import credentialRepos from "../repositories/credentialRepository.js";

import Cryptr from "cryptr";

export type infoCredential = Omit<Credential, "id" | "createdAt" | "userId">;
export type infoInsert = Omit<Credential, "id" | "createdAt">;

export async function createCredential(data: infoCredential, userId: number) {

    const confirmDuplicated = await credentialRepos.findByIdAndTitle(userId, data.title);

    if (confirmDuplicated) {
        throw {
            type: "conflict",
            message: "This title already exists!"
        }
    }

    const password = await encryptInformation(data.password);

    await insertData({ password: password.dataEncrypted, title: data.title, url: data.url, username: data.username,
    userId: userId});
}

async function encryptInformation(info: string) {
    const data = new Cryptr(process.env.KEY);
    const dataEncrypted = data.encrypt(info);
    return {
        dataEncrypted
    };
}

async function insertData(data: infoInsert) {

    await credentialRepos.insert({userId: data.userId, password: data.password, title: data.title, 
        url: data.url, username: data.username});

}