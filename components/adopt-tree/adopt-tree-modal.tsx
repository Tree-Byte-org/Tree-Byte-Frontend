"use client";

import { useState } from "react";
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
  projectId: number;
}) {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<number>(1);
  const { toast } = useToast();

  const handlePurchase = async () => {
    try {
      setLoading(true);

      const userId = Number(localStorage.getItem("user_id"));
      if (!userId) {
        throw new Error("User not logged in or user_id missing");
      }

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

        <div className="space-y-3">
          <label className="text-sm font-medium">Amount</label>
          <Input
            type="number"
            value={amount}
            min={1}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>

        <Button onClick={handlePurchase} disabled={loading || amount < 1}>
          {loading ? "Processing..." : "Confirm Purchase"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
