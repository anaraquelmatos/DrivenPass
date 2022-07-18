import prisma from "../../config/database.js";
import { infoInsert } from "../services/credentialService.js";

async function findByIdAndTitle(userId: number, title: string) {
    return await prisma.credential.findFirst({ where: { userId, title } });
}

async function insert({ url, username, password, title, userId }: infoInsert) {
    await prisma.credential.create({
        data: {
            url,
            username,
            password,
            title,
            userId
        }
    })
}

const credentialRepos = {
    findByIdAndTitle,
    insert
}

export default credentialRepos;