import prisma from "../../config/database.js";
import { infoUser } from "../services/authService.js";

async function insert(data: infoUser) {
    await prisma.user.create({
        data: {
            email: data.email,
            password: data.password
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