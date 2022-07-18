import prisma from "../../config/database.js";
import { infoCredential } from "../services/credentialService.js";

async function findByIdAndTitle(userId: number, title: string) {
    return await prisma.credential.findFirst({where: {userId, title}});
}

async function findById(id: number) {
    return await prisma.credential.findFirst({where: {id}});
}


const credentialRepos = {
    findByIdAndTitle,
    findById
}

export default credentialRepos;