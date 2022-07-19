import { Request, Response } from "express";
import * as wifiService from "../services/wifiService.js";
import { infoWifi } from "../services/wifiService.js";

export async function postWifi(req: Request, res: Response) {

    const data: infoWifi = req.body;

    const userId: number = res.locals.userId;

    await wifiService.createWifi(data, userId);

    res.sendStatus(201);
}

// export async function getWifiById(req: Request, res: Response) {

//     const id = Number(req.params.id);

//     const userId: number = res.locals.userId;

//     if (!id) {
//         throw {
//             type: "unauthorized",
//             message: "Invalid param!"
//         }
//     }

//     const data = await wifiService.getWifi(id, userId);

//     res.send(data).status(200);
// }

// export async function getWifis(req: Request, res: Response) {

//     const userId: number = res.locals.userId;

//     const data = await wifiService.getWifis(userId);

//     res.send({ wifis: data }).status(200);
// }

// export async function deleteWifiById(req: Request, res: Response) {

//     const id = Number(req.params.id);

//     const userId: number = res.locals.userId;

//     if (!id) {
//         throw {
//             type: "unauthorized",
//             message: "Invalid param!"
//         }
//     }

//     await wifiService.deleteWifi(id, userId);

//     res.sendStatus(200);
// }

