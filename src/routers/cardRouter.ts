import { Router } from "express";
import { postCard } from "../controllers/cardController.js";
import { errorDataCard } from "../middlewares/cardMiddleware.js";
import { verifyErrorSession } from "../middlewares/sessionMiddleware.js";

const card = Router();

card.post("/create-card", verifyErrorSession, errorDataCard, postCard);

export default card;