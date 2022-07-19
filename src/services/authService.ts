import userRepos from "../repositories/userRepository.js";
import sessionRepos from "../repositories/sessionRepository.js";

import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export type infoUser = Omit<User, "id" | "createdAt">;

export async function SignUpUser(user: infoUser) {

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

export async function SignInUser(user: infoUser) {

    const infoUser = await userRepos.findByEmail(user.email);

    if (!infoUser) {
        throw {
            type: "not found",
            message: "User doesn't exist!"
        }
    }

    await validatePassword(user.password, infoUser.password);

    const token = await generateToken(infoUser.id);

    await saveToken(token, infoUser.id)

    return token;
}

async function validatePassword(password: string, passwordEncrypted: string) {

    if (!bcrypt.compareSync(password, passwordEncrypted)) {
        throw {
            type: "unauthorized",
            message: "Incorrect password!"
        }
    }
}

async function generateToken(id: number) {
    const data = { id };
    const secretKey = process.env.JWT_SECRET;
    const settings = { expiresIn: 60 * 60 * 24 * 30 }
    const token = jwt.sign(data, secretKey, settings);
    return token;
}

async function saveToken(token: string, userId: number) {
    await sessionRepos.insert(token, userId);
}