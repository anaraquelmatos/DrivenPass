import prisma from "../../config/database.js";

async function findSession(token: string) {
    return await prisma.session.findFirst({ where: { token } });
}

async function insert(token: string, userId: number) {
    await prisma.session.create({
        data: {
            token,
            userId
        }
    })
}

const sessionRepos = {
    findSession,
    insert
}

export default sessionRepos;
