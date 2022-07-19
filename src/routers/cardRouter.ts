import { Router } from "express";
import { deleteCardById, getCardById, getCards, postCard } from "../controllers/cardController.js";
import { errorDataCard } from "../middlewares/cardMiddleware.js";
import { verifyErrorSession } from "../middlewares/sessionMiddleware.js";

const card = Router();

card.post("/create-card", verifyErrorSession, errorDataCard, postCard);
card.get("/card/:id", verifyErrorSession, getCardById);
card.get("/cards", verifyErrorSession, getCards);
card.delete("/delete-card/:id", verifyErrorSession, deleteCardById);

export default card;