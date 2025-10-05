import { useEffect, useState } from "react";
import { useWallet } from "@/hooks/use-wallet.hook";
import {
  BASE_FEE,
  Contract,
  Networks,
  rpc as StellarRpc,
  Transaction,
  TransactionBuilder,
  Address,
  ScInt,
} from "@stellar/stellar-sdk";
import { signTransaction } from "@stellar/freighter-api";
import { kit } from "@/components/auth/constant/walletkit";
import init, { decode } from "@stellar/stellar-xdr-json";

const CONTRACT_ID = "CANSAO7W4JWZE445NXVN34IXMIZ2KZI6YM4HHEE3AZ7U737MC3ZOE67H";
const NETWORK_PASSPHRASE = Networks.TESTNET;
const SOROBAN_URL = "https://soroban-testnet.stellar.org";

async function getData(hash: string) {
  const requestBody = {
    jsonrpc: "2.0",
    id: 8675309,
    method: "getTransaction",
    params: { hash },
  };
  const res = await fetch(SOROBAN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });
  return res.json();
}

export function useTokenPurchase() {
  const { handleConnect } = useWallet();
  const [publicKey, setPublicKey] = useState<string>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkWallet = async () => {
      const { address } = await kit.getAddress();
      if (address) {
        setPublicKey(address);
      }
    };

    checkWallet();
  }, []);

  const handlePurchase = async () => {
    if (!publicKey) {
      console.error("Wallet not connected");
      return;
    }

    setLoading(true);

    try {
      const server = new StellarRpc.Server(SOROBAN_URL);
      const account = await server.getAccount(publicKey);
      const addressArg = Address.fromString(account.accountId());
      const tokenAmount = new ScInt(1, { type: "u64" });
      const contract = new Contract(CONTRACT_ID);

      const tx = new TransactionBuilder(account, {
        fee: BASE_FEE,
        networkPassphrase: NETWORK_PASSPHRASE,
      })
        .addOperation(contract.call("buy_tokens", addressArg.toScVal(), tokenAmount.toU64()))
        //.addOperation(contract.call("get_remaining_supply"))
        .setTimeout(50)
        .build();

      const preparedTx = await server.prepareTransaction(tx);
      const signedXdr = await signTransaction(preparedTx.toEnvelope().toXDR("base64"), {
        networkPassphrase: NETWORK_PASSPHRASE,
      });

      const signedTx = TransactionBuilder.fromXDR(
        signedXdr.signedTxXdr,
        NETWORK_PASSPHRASE,
      ) as Transaction;

      const txResult = await server.sendTransaction(signedTx);

      if (txResult.status !== "PENDING") {
        throw new Error("Something went wrong");
      }

      const hash = txResult.hash;
      let getResponse = await getData(hash);
      let status = getResponse.result.status;

      while (status === "NOT_FOUND") {
        console.log("Waiting for transaction confirmation...", hash);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        getResponse = await getData(hash);
        status = getResponse.result.status;
      }

      await init();
      const decodedResult = JSON.parse(decode("TransactionMeta", getResponse.result.resultMetaXdr));
      console.log(decodedResult.v4.soroban_meta.return_value);

      // Update count or handle success
    } catch (error) {
      console.error("Error incrementing counter:", error);
      alert("Error incrementing counter. Please check the console for details.");
    } finally {
      setLoading(false);
    }
  };

  const connectAndRefresh = async () => {
    await handleConnect();
    const { address } = await kit.getAddress();
    if (address) setPublicKey(address);
  };

  return {
    publicKey,
    loading,
    handleConnect: connectAndRefresh,
    handlePurchase,
  };
}
