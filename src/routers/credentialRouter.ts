import { Router } from "express";
import { getCredentialById, getCredentials, postCredential } from "../controllers/credentialController.js";
import { errorDataCredential } from "../middlewares/credentialMiddleware.js";
import { verifyErrorSession } from "../middlewares/sessionMiddleware.js";

const credential = Router();

credential.post("/create-credential", errorDataCredential, verifyErrorSession, postCredential);
credential.get("/credential/:id", verifyErrorSession, getCredentialById);
credential.get("/credentials", verifyErrorSession, getCredentials);

export default credential;