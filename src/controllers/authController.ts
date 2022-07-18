import { Request, Response } from "express";
import { userData } from "../schemas/authSchema.js";
import * as authService from "../services/authService.js";

export async function SignUp(req: Request, res: Response) {

    const data: authService.createUser = req.body;

    const { error } = userData.validate(data, { abortEarly: false });

    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }

    await authService.SignUpUser(data);

    res.sendStatus(201);
}

export async function SignIn(req: Request, res: Response){

    const data: authService.createUser = req.body;

    const { error } = userData.validate(data, { abortEarly: false });

    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }

    await authService.SignInUser(data);

    res.sendStatus(200);

}
