"use client";

import { useGlobalAuthenticationStore } from "@/data";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

export default function SuccessPage() {
  const { address } = useGlobalAuthenticationStore();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    toast({ title: "Public key copied to clipboard." });
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-xl text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🎉 Welcome to TreeByte
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your wallet has been successfully connected. Below is your public key.
        </p>

        <div className="bg-gray-100 border border-gray-200 rounded-md px-4 py-3 mb-6 flex items-center justify-between overflow-auto">
          <code className="text-sm text-gray-800 break-all">{address}</code>
          <Button variant="ghost" size="icon" onClick={handleCopy}>
            <Copy className="w-4 h-4 ml-2 text-green-600" />
          </Button>
        </div>

        <section className="text-left bg-green-50 border border-green-100 rounded-lg p-6 space-y-4 shadow-sm">
          <h2 className="text-xl font-semibold text-green-700">
            🌿 What’s next?
          </h2>
          <ul className="list-disc list-inside text-green-900 text-sm">
            <li>
              <strong>Tokens:</strong> View your environmental impact balance
            </li>
            <li>
              <strong>Coupons:</strong> Get discounts for eco-tourism
              experiences
            </li>
            <li>
              <strong>Achievements:</strong> Track your milestones in
              reforestation
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
