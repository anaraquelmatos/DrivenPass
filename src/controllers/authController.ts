import { Request, Response } from "express";
import * as authService from "../services/authService.js";

export async function SignUp(req: Request, res: Response) {

    const data: authService.infoUser = req.body;

    await authService.SignUpUser(data);

    res.sendStatus(201);
}

export async function SignIn(req: Request, res: Response){

    const data: authService.infoUser = req.body;

    const token = await authService.SignInUser(data);

    res.send(token).status(200);

}
