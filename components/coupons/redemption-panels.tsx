"use client";

import { useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Loader2,
  RefreshCw,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import type { Coupon, RedemptionResult } from "@/types/coupon";
import { cn } from "@/lib/utils";

export function LoadingPanel({ onClose }: { onClose?: () => void }) {
  return (
    <Card className="w-full max-w-xl mx-auto bg-background border border-gray-200 dark:border-gray-700 shadow-lg">
      <CardContent className="p-8">
        <div className="flex items-center gap-4 text-foreground">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <div>
            <p className="font-medium text-xl">Processing Redemption</p>
            <p className="text-base text-muted-foreground mt-2">
              Please wait while we verify your coupon
            </p>
          </div>
        </div>

        {onClose && (
          <div className="mt-6 flex justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function SuccessPanel({
  coupon,
  onClose,
  onViewDetails,
}: {
  coupon: Coupon;
  onClose?: () => void;
  onViewDetails?: (coupon: Coupon) => void;
}) {
  const redemptionDate = coupon.redemptionDate
    ? new Date(coupon.redemptionDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

  return (
    <Card className="w-full max-w-xl mx-auto bg-background border border-gray-200 dark:border-gray-700 shadow-lg">
      <CardHeader className="pb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/50">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <CardTitle className="text-xl">Redemption Successful</CardTitle>
            <Badge className="mt-3 text-base bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700">
              Confirmed
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-6">
          <div className="p-5 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="font-semibold text-lg">{coupon.businessName}</p>
            <p className="text-base text-muted-foreground mt-2">
              {coupon.description}
            </p>
          </div>

          <div className="text-base space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Redeemed:</span>
              <span className="font-medium">{redemptionDate}</span>
            </div>
            {coupon.redemptionLocation && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location:</span>
                <span className="font-medium">{coupon.redemptionLocation}</span>
              </div>
            )}
            {coupon.redemptionCode && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Code:</span>
                <span className="font-mono font-medium">
                  {coupon.redemptionCode}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          {onViewDetails && (
            <Button
              variant="outline"
              onClick={() => onViewDetails(coupon)}
              className="flex-1 py-5 text-base"
            >
              View Details
            </Button>
          )}
          {onClose && (
            <Button onClick={onClose} className="flex-1 py-5 text-base">
              Close
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function ErrorPanel({
  result,
  onRetry,
  onClose,
}: {
  result: RedemptionResult;
  onRetry?: () => void;
  onClose?: () => void;
}) {
  const getConfig = () => {
    switch (result.errorType) {
      case "expired":
        return {
          icon: (
            <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/50">
              <AlertTriangle className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            </div>
          ),
          badgeClass:
            "bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-700",
          textClass: "text-amber-600 dark:text-amber-400",
        };
      case "network_error":
        return {
          icon: (
            <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/50">
              <RefreshCw className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
          ),
          badgeClass:
            "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 border-red-200 dark:border-red-700",
          textClass: "text-red-600 dark:text-red-400",
        };
      default:
        return {
          icon: (
            <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/50">
              <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
          ),
          badgeClass:
            "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 border-red-200 dark:border-red-700",
          textClass: "text-red-600 dark:text-red-400",
        };
    }
  };

  const config = getConfig();
  const showRetry = result.errorType === "network_error" && onRetry;
  const showSupport = ["invalid_coupon", "unknown"].includes(
    result.errorType || ""
  );

  return (
    <Card className="w-full max-w-xl mx-auto bg-background border border-gray-200 dark:border-gray-700 shadow-lg">
      <CardHeader className="pb-6">
        <div className="flex items-center gap-4">
          {config.icon}
          <div>
            <CardTitle className="text-xl">Redemption Failed</CardTitle>
            <Badge className={cn("mt-3 text-base", config.badgeClass)}>
              {result.errorType?.replace(/_/g, " ") || "Error"}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-6">
          <p className={cn("text-base", config.textClass)}>{result.message}</p>

          {result.errorType === "expired" && (
            <p className="text-base text-muted-foreground">
              This coupon has passed its expiration date.
            </p>
          )}

          {result.errorType === "already_redeemed" && (
            <p className="text-base text-muted-foreground">
              This coupon has already been used.
            </p>
          )}

          {result.errorType === "network_error" && (
            <p className="text-base text-muted-foreground">
              Please check your connection and try again.
            </p>
          )}
        </div>

        <div className="mt-8 flex gap-4">
          {showRetry && (
            <Button
              variant="outline"
              onClick={onRetry}
              className="flex-1 py-5 text-base"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Retry
            </Button>
          )}

          {showSupport && (
            <Button
              variant="outline"
              onClick={() => window.open("https://vercel.com/help", "_blank")}
              className="flex-1 py-5 text-base"
            >
              <HelpCircle className="w-5 h-5 mr-2" />
              Get Help
            </Button>
          )}

          {onClose && (
            <Button onClick={onClose} className="flex-1 py-5 text-base">
              Close
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
