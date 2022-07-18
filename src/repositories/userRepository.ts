import prisma from "../../config/database.js";
import { infoUser } from "../services/authService.js";

async function insert({email, password}: infoUser) {
    await prisma.user.create({
        data: {
            email,
            password
        }
    })
}

async function findByEmail(email: string) {
    return await prisma.user.findUnique({where:{email}});
}

const userRepos = {
    insert,
    findByEmail
}

export default userRepos;