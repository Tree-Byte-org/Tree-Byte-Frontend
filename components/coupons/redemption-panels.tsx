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
    <Card className="max-w-md mx-auto bg-background border border-gray-200 dark:border-gray-700 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 text-foreground">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <div>
            <p className="font-medium text-lg">Processing Redemption</p>
            <p className="text-sm text-muted-foreground mt-1">
              Please wait while we verify your coupon
            </p>
          </div>
        </div>

        {onClose && (
          <div className="mt-4 flex justify-end">
            <Button variant="outline" size="sm" onClick={onClose}>
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
    <Card className="max-w-md mx-auto bg-background border border-gray-200 dark:border-gray-700 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/50">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <CardTitle className="text-lg">Redemption Successful</CardTitle>
            <Badge className="mt-2 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700">
              Confirmed
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="font-semibold">{coupon.businessName}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {coupon.description}
            </p>
          </div>

          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Redeemed:</span>
              <span>{redemptionDate}</span>
            </div>
            {coupon.redemptionLocation && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location:</span>
                <span>{coupon.redemptionLocation}</span>
              </div>
            )}
            {coupon.redemptionCode && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Code:</span>
                <span className="font-mono">{coupon.redemptionCode}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          {onViewDetails && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(coupon)}
              className="flex-1"
            >
              View Details
            </Button>
          )}
          {onClose && (
            <Button size="sm" onClick={onClose} className="flex-1">
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
            <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/50">
              <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
          ),
          badgeClass:
            "bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-700",
          textClass: "text-amber-600 dark:text-amber-400",
        };
      case "network_error":
        return {
          icon: (
            <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/50">
              <RefreshCw className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          ),
          badgeClass:
            "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 border-red-200 dark:border-red-700",
          textClass: "text-red-600 dark:text-red-400",
        };
      default:
        return {
          icon: (
            <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/50">
              <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
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
    <Card className="max-w-md mx-auto bg-background border border-gray-200 dark:border-gray-700 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          {config.icon}
          <div>
            <CardTitle className="text-lg">Redemption Failed</CardTitle>
            <Badge className={cn("mt-2", config.badgeClass)}>
              {result.errorType?.replace(/_/g, " ") || "Error"}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          <p className={config.textClass}>{result.message}</p>

          {result.errorType === "expired" && (
            <p className="text-sm text-muted-foreground">
              This coupon has passed its expiration date.
            </p>
          )}

          {result.errorType === "already_redeemed" && (
            <p className="text-sm text-muted-foreground">
              This coupon has already been used.
            </p>
          )}

          {result.errorType === "network_error" && (
            <p className="text-sm text-muted-foreground">
              Please check your connection and try again.
            </p>
          )}
        </div>

        <div className="mt-6 flex gap-2">
          {showRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="flex-1"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          )}

          {showSupport && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open("https://vercel.com/help", "_blank")}
              className="flex-1"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Get Help
            </Button>
          )}

          {onClose && (
            <Button size="sm" onClick={onClose} className="flex-1">
              Close
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
