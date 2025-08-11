export interface User {
  id: string;
  email: string;
  publicKey: string;
  authMethod: "email" | "google" | "external";
  createdAt: string;
}
