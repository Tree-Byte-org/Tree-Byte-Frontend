"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { buyToken } from "@/services/buy-token.service";

export default function AdoptTreeModal({
  isOpen,
  onClose,
  projectId,
}: {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<number>(1);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      const hardcodedUserId = "4acf18ef-6166-498e-8c50-18fabaf12feb";
      localStorage.setItem("user_id", hardcodedUserId);
      setUserId(hardcodedUserId);
    }
  }, [isOpen]);

  const handlePurchase = async () => {
    try {
      if (!userId) {
        throw new Error("User not logged in or invalid user_id");
      }
      setLoading(true);
      await buyToken(projectId, userId, amount);
      toast({ title: "Success", description: "Tree adopted successfully!" });
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Purchase failed. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adopt a Tree</DialogTitle>
          <DialogDescription>
            Enter the amount of tokens to adopt trees.
          </DialogDescription>
        </DialogHeader>

        {!userId && (
          <p className="text-sm text-red-500">
            You need to log in before adopting a tree.
          </p>
        )}

        <div className="space-y-3">
          <label className="text-sm font-medium">Amount</label>
          <Input
            type="number"
            value={amount}
            min={1}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>

        <Button
          onClick={handlePurchase}
          disabled={loading || amount < 1 || !userId}
        >
          {loading ? "Processing..." : "Confirm Purchase"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
