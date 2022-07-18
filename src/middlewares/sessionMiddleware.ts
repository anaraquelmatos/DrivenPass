import { NextFunction, Request, Response } from "express";
import sessionRepos from "../repositories/sessionRepository.js";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function verifyErrorSession(req: Request, res: Response, next: NextFunction) {

    const { authorization } = req.headers;

    const data = authorization?.replace("Bearer", "").trim();

    if (!data) return res.status(401).send("Token is required!");

    const session = await sessionRepos?.findSession(data);

    if (!session) {
        return res.status(401).send("The registry cannot be accessed!");
    }

    const token = jwt.verify(data, process.env.JWT_SECRET);

    if (!token) return res.status(401).send("Invalid token!");

    const userId: number = session.userId;
    res.locals.userId = userId;

    next();
}

