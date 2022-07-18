import prisma from "../../config/database.js";

async function findSession(token: string) {
    return await prisma.session.findFirst({where: {token}});
}

const sessionRepos = {
    findSession
}

export default sessionRepos;
