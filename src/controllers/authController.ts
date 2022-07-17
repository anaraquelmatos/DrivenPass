import { Request, Response } from "express";
import { signUp } from "../schemas/authSchema.js";
import * as authService from "../services/authService.js";

export async function SignUp(req: Request, res: Response) {

    const data: authService.createUser = req.body;

    const { error } = signUp.validate(data, { abortEarly: false });

    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }

    await authService.SignUpUser(data);

    res.sendStatus(201);
}
