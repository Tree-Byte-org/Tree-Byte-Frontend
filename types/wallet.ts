export interface WalletData {
  address: string;
  name: string;
  balance?: string;
  network: "testnet" | "mainnet";
}
