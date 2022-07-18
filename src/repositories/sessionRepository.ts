import prisma from "../../config/database.js";

async function findSession(token: string) {
    const session = await prisma.session.findFirst({ where: { token } });
    return session.userId;
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
