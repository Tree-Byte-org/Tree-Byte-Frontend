import { Server } from "@stellar/stellar-sdk/rpc";
import { STELLAR_CONFIG } from "./config";

export const stellarServer = new Server(STELLAR_CONFIG.horizonURL);
