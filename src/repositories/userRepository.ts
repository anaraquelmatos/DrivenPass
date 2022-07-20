import prisma from "../../config/database.js";
import { infoUser } from "../services/authService.js";

async function insert(infoUser: infoUser) {
    await prisma.user.create({
        data: infoUser
    })
}

async function findByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
}

const userRepos = {
    insert,
    findByEmail
}

export default userRepos;