"use client";

import { useEffect, useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Coupon, RedemptionResult } from "@/types/coupon";
import { LoadingPanel, SuccessPanel, ErrorPanel } from "./redemption-panels";

/**
 * Wrapper that:
 * - shows a persistent live region for screen readers,
 * - fires toasts,
 * - renders the appropriate visual panel.
 */
interface CouponRedemptionFeedbackProps {
  result: RedemptionResult | null;
  loading: boolean;
  onRetry?: () => void;
  onClose?: () => void;
  onViewDetails?: (coupon: Coupon) => void;
}

export default function CouponRedemptionFeedback({
  result,
  loading,
  onRetry,
  onClose,
  onViewDetails,
}: CouponRedemptionFeedbackProps) {
  const { toast } = useToast();

  const [liveMessage, setLiveMessage] = useState<string | null>(null);
  const [liveRole, setLiveRole] = useState<"status" | "alert">("status");
  const liveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (liveTimerRef.current) {
      clearTimeout(liveTimerRef.current);
      liveTimerRef.current = null;
    }

    if (result?.success) {
      toast({
        title: "Coupon Redeemed Successfully!",
        description: `Your coupon for ${result.coupon?.businessName} has been redeemed.`,
        duration: 5000,
      });

      setLiveRole("status");
      setLiveMessage(
        `Coupon redeemed successfully for ${result.coupon?.businessName}`
      );
      liveTimerRef.current = setTimeout(() => setLiveMessage(null), 4000);
    } else if (result && !result.success) {
      toast({
        title: "Redemption Failed",
        description: result.message,
        variant: "destructive",
        duration: 7000,
      });

      setLiveRole("alert");
      setLiveMessage(`Redemption failed: ${result.message}`);
      liveTimerRef.current = setTimeout(() => setLiveMessage(null), 6000);
    }

    return () => {
      if (liveTimerRef.current) {
        clearTimeout(liveTimerRef.current);
        liveTimerRef.current = null;
      }
    };
  }, [result, toast]);

  return (
    <>
      <div
        aria-live={liveRole === "status" ? "polite" : "assertive"}
        role={liveRole === "status" ? "status" : "alert"}
        aria-atomic="true"
        className="sr-only"
      >
        {liveMessage}
      </div>

      {loading ? (
        <LoadingPanel onClose={onClose} />
      ) : result?.success ? (
        <SuccessPanel
          coupon={result.coupon!}
          onClose={onClose}
          onViewDetails={onViewDetails}
        />
      ) : result && !result.success ? (
        <ErrorPanel result={result} onRetry={onRetry} onClose={onClose} />
      ) : null}
    </>
  );
}
