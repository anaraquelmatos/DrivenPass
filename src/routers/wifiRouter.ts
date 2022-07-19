import { Router } from "express";
import { getWifiById, getWifis, postWifi } from "../controllers/wifiController.js";
import { verifyErrorSession } from "../middlewares/sessionMiddleware.js";
import { errorDataWifi } from "../middlewares/wifiMiddleware.js";


const wifi = Router();

wifi.post("/create-wifi", verifyErrorSession, errorDataWifi, postWifi);
wifi.get("/wifi/:id", verifyErrorSession, getWifiById);
wifi.get("/wifis", verifyErrorSession, getWifis);
// wifi.delete("/delete-wifi/:id", verifyErrorSession);

export default wifi;