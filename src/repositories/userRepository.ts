import prisma from "../../config/database.js";
import { createUser } from "../services/authService.js";

async function insert({email, password}: createUser) {
    await prisma.user.create({
        data: {
            email,
            password
        }
    })
}

async function findByEmail(email: string) {
    const user = await prisma.user.findUnique({
        where:{
            email
        }
    })
    return user;
}

const userRepos = {
    insert,
    findByEmail
}

export default userRepos;