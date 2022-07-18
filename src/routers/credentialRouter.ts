import { Router } from "express";
import { Credential } from "../controllers/credentialController.js";
import { errorDataCredential } from "../middlewares/credentialMiddleware.js";
import { verifyErrorSession } from "../middlewares/sessionMiddleware.js";

const credential = Router();

credential.post("/credential", errorDataCredential, verifyErrorSession, Credential);

export default credential;