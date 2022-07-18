import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import userRepos from "../repositories/userRepository.js";

export type createUser = Omit<User, "id" | "createdAt">;

export async function SignUpUser(user: createUser) {

    await searchUserEmail(user.email);

    const passwordEncrypted = await encryptData(user.password);

    await userRepos.insert({ email: user.email, password: passwordEncrypted });

}

async function encryptData(data: string) {
    const NUMBER = 10;
    const encrypted = bcrypt.hashSync(data, NUMBER);
    return encrypted;
}

async function searchUserEmail(email: string) {
    const verifyEmail = await userRepos.findByEmail(email);

    if (verifyEmail) {
        throw {
            type: "conflict",
            message: "An account already exists with this email!"
        }
    }
}

export async function SignInUser(user: createUser) {

    const infoUser = await userRepos.findByEmail(user.email);

    if (!infoUser) {
        throw {
            type: "not found",
            message: "User doesn't exist!"
        }
    }

    await validatePassword(user.password, infoUser.password);
}

async function validatePassword(password: string, passwordEncrypted: string) {

    if(!bcrypt.compareSync(password, passwordEncrypted)){
        throw {
            type: "unauthorized",
            message: "Incorrect password!"
        }
    }
}