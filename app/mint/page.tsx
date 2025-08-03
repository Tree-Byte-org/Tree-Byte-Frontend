"use client";

import { useTokenPurchase } from "@/hooks/use-token-purchase";

export default function BuyPage() {
  const { publicKey, loading, handleConnect, handlePurchase } = useTokenPurchase();

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">
        Stellar Smart Contract
      </h1>
      {publicKey ? (
        <div>
          <p className="mb-4">Connected: {publicKey}</p>
          <button
            onClick={handlePurchase}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </span>
            ) : (
              "Buy Tokens"
            )}
          </button>
        </div>
      ) : (
        <div>
          <p>Please connect your Freighter wallet to use this app.</p>
          <button onClick={handleConnect}> Connect </button>
        </div>
      )}
    </div>
  );
}