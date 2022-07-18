import { Credential } from "@prisma/client";
import credentialRepos from "../repositories/credentialRepository";

export type infoCredential = Omit<Credential, "id" | "createdAt" | "userId">;

export async function createCredential(data: infoCredential, userId: number) {

    

}
