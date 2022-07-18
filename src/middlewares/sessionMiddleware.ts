import { NextFunction, Request, Response } from "express";
import sessionRepos from "../repositories/sessionRepository.js";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function verifyErrorSession(req: Request, res: Response, next: NextFunction) {

    const { authorization } = req.headers;

    const data = authorization?.replace("Bearer", "").trim();

    if (!data) return res.status(401).send("Non-existent token!");

    const token = jwt.verify(data, process.env.JWT_SECRET);

    const session = await sessionRepos.findSession(data);

    if (!token || !session) {
        if (!data) return res.send("Invalid token!").status(401);
    }

    const userId: number = session.userId;
    res.locals.userId = userId;

    next()
}

