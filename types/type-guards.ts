import { AuthError, ErrorCategory, isAppError } from "@/types/error";
import { WalletData } from "./wallet";
import { User } from "./User";

export function isValidUser(data: unknown): data is User {
  if (!data || typeof data !== "object") return false;
  const candidate = data as Partial<User> & Record<string, unknown>;
  const hasId =
    typeof candidate.id === "string" && candidate.id.trim().length > 0;
  const hasEmail =
    typeof candidate.email === "string" && candidate.email.trim().length > 0;
  const publicKeyOk =
    typeof candidate.publicKey === "string" &&
    candidate.publicKey.trim().length > 0;
  const authMethodOk =
    typeof candidate.authMethod === "string" &&
    ["email", "google", "external"].includes(candidate.authMethod);
  const createdAtOk =
    typeof candidate.createdAt === "string" &&
    candidate.createdAt.trim().length > 0;
  return hasId && hasEmail && publicKeyOk && authMethodOk && createdAtOk;
}

export function isValidWalletData(data: unknown): data is WalletData {
  if (!data || typeof data !== "object") return false;
  const candidate = data as Partial<WalletData> & Record<string, unknown>;
  const hasAddress =
    typeof candidate.address === "string" &&
    candidate.address.trim().length > 0;
  const hasName =
    typeof candidate.name === "string" && candidate.name.trim().length > 0;
  const networkOk =
    typeof candidate.network === "string" &&
    ["testnet", "mainnet"].includes(candidate.network);
  return hasAddress && hasName && networkOk;
}

export function isAuthError(error: unknown): error is AuthError {
  if (!isAppError(error)) return false;
  return error.category === ErrorCategory.auth;
}
