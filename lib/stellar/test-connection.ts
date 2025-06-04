import { Keypair, Horizon } from "@stellar/stellar-sdk";
import { STELLAR_CONFIG } from "./config";

const server = new Horizon.Server(STELLAR_CONFIG.horizonURL);

export async function testConnection() {
  const keypair = Keypair.random();
  const publicKey = keypair.publicKey();
  const secretKey = keypair.secret();

  console.log("🔐 Generating keypair...");
  console.log("🧾 Public Key:", publicKey);
  console.log("🗝️ Secret Key:", secretKey);

  try {
    if (STELLAR_CONFIG.friendbotURL) {
      const url = `${STELLAR_CONFIG.friendbotURL}?addr=${encodeURIComponent(publicKey)}`;
      console.log("🌐 Requesting funds from Friendbot...");
      const res = await fetch(url);
      if (!res.ok) {
        const errorText = await res.text();
        console.error("❌ Friendbot funding error:", errorText);
        throw new Error(errorText);
      }
      console.log("✅ Account successfully funded");
    }

    console.log("📡 Querying account on the network...");
    const account = await server.accounts().accountId(publicKey).call();

    console.log("✅ Account found on Horizon");
    console.log("💰 Balances:", account.balances);

    return {
      publicKey,
      secretKey,
      balances: account.balances,
    };
  } catch (err) {
    console.error("❌ Connection error:", err);
    return null;
  }
}

// Run directly if this file is executed
console.log("🚀 Starting Stellar connection test...");
testConnection()
  .then((result) => {
    console.log("✅ Final result:", result);
  })
  .catch((error) => {
    console.error("❌ Unexpected error:", error);
  });
