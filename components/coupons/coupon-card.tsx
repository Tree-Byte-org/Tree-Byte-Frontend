"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";
import type { Coupon } from "@/types/coupon";
import { CouponStatus } from "@/types/coupon";
import { statusStyles } from "@/shared/status";
import CouponQRGenerator from "@/components/coupons/coupon-qr-generator";

type Props = {
  coupon: Coupon;
};

export function CouponCard({ coupon }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const styles = statusStyles(coupon.status);
  const isDisabled = coupon.status !== CouponStatus.Active;

  return (
    <>
      <Card
        className={`overflow-hidden hover:shadow-lg transition-shadow duration-200 ${
          isDisabled ? "cursor-not-allowed" : "cursor-pointer"
        } bg-white dark:bg-black border-gray-200 dark:border-gray-700 ${
          styles.card
        }`}
      >
        <div className="relative w-full h-40">
          <Image
            src={coupon.imageUrl || "/placeholder.svg"}
            alt={coupon.businessName}
            fill
            className={`object-cover ${styles.image}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardHeader className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
                {coupon.businessName}
              </CardTitle>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                {coupon.description}
              </p>
            </div>
            <Badge className={styles.badge}>{coupon.status}</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0 px-4 pb-2">
          <div className="flex items-center justify-between text-xs text-gray-700 dark:text-gray-300">
            <span>Type: {coupon.activityType}</span>
            <span>
              Expires: {new Date(coupon.expirationDate).toLocaleDateString()}
            </span>
          </div>
          {expanded && (
            <div className="mt-3 text-sm text-gray-700 dark:text-gray-200 space-y-1">
              {coupon.redemptionCode && (
                <p className="font-medium">Code: {coupon.redemptionCode}</p>
              )}
              <p>
                Acquired:{" "}
                {new Date(coupon.acquisitionDate).toLocaleDateString()}
              </p>
              <p>
                Status: <span className="font-medium">{coupon.status}</span>
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="px-4 pb-4 pt-0">
          <div className="flex w-full items-center justify-between gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setExpanded((v) => !v)}
              disabled={isDisabled}
            >
              {expanded ? "Hide details" : "View details"}
            </Button>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowQR(true)}
                disabled={isDisabled}
                className="px-2"
              >
                <QrCode className="w-4 h-4" />
              </Button>
              <Button size="sm" disabled={isDisabled}>
                Redeem
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>

      <CouponQRGenerator
        isOpen={showQR}
        onClose={() => setShowQR(false)}
        coupon={coupon}
      />
    </>
  );
}

export default CouponCard;
