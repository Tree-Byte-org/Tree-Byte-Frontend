// src/lib/stellar/server.ts
import { Server } from "@stellar/stellar-sdk/lib/server";
import { STELLAR_CONFIG } from "./config";

export const stellarServer = new Server(STELLAR_CONFIG.horizonURL);
