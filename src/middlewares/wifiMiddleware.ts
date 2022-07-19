import { NextFunction, Request, Response } from "express";
import { wifiData } from "../schemas/wifiSchema.js";
import { infoWifi } from "../services/wifiService.js";

export async function errorDataWifi(req: Request, res: Response, next: NextFunction) {

    const data: infoWifi = req.body;

    const { error } = wifiData.validate(data, { abortEarly: false });

    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }

    next();
}