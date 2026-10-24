"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";
import {
  MapPin,
  Calendar,
  Users,
  Tag,
  Mail,
  Phone,
  Globe,
  FileText,
  AlertCircle,
  RefreshCw,
  QrCode,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import type { Coupon, RedemptionResult } from "@/types/coupon";
import { CouponStatus } from "@/types/coupon";
import { statusStyles } from "@/shared/status";
import { useCouponMetadata } from "@/hooks/coupons/use-coupon-metadata";

interface CouponDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  coupon: Coupon;
  onRedeem?: (couponId: string) => Promise<RedemptionResult>;
  onShowQR?: () => void;
}

function CouponModalSkeleton() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <Skeleton className="h-48 w-full rounded-lg" />
      <div className="grid grid-cols-3 gap-2">
        <Skeleton className="h-16 w-full rounded-lg" />
        <Skeleton className="h-16 w-full rounded-lg" />
        <Skeleton className="h-16 w-full rounded-lg" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

export function CouponDetailsModal({
  isOpen,
  onClose,
  coupon,
  onRedeem,
  onShowQR,
}: CouponDetailsModalProps) {
  const { metadata, loading, error, refetch } = useCouponMetadata(coupon);
  const [redeeming, setRedeeming] = useState(false);
  const [redemptionDone, setRedemptionDone] = useState(false);

  const styles = statusStyles(coupon.status);
  const isActive = coupon.status === CouponStatus.Active && !redemptionDone;

  const handleRedeem = async () => {
    if (!onRedeem || !isActive) return;
    try {
      setRedeeming(true);
      const res = await onRedeem(coupon.id);
      if (res.success) {
        setRedemptionDone(true);
      }
    } finally {
      setRedeeming(false);
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const discountLabel = metadata.discountPercentage
    ? `${metadata.discountPercentage}% OFF`
    : metadata.discountAmount
    ? `${metadata.discountAmount} ${metadata.discountCurrency || "USD"} OFF`
    : "Special Discount";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
        {/* Header */}
        <DialogHeader className="mb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-xs">
                  {metadata.activityType || coupon.activityType}
                </Badge>
                <Badge className={styles.badge}>{coupon.status}</Badge>
              </div>
              <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                {metadata.businessName || coupon.businessName}
              </DialogTitle>
              {metadata.businessAddress && (
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 gap-1 mt-1">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span>{metadata.businessAddress}</span>
                </div>
              )}
            </div>
          </div>
        </DialogHeader>

        {/* Loading state */}
        {loading && <CouponModalSkeleton />}

        {/* Error warning if IPFS had issue but fallback loaded */}
        {error && (
          <Alert className="mb-4 border-amber-200 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-200">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <AlertDescription className="flex items-center justify-between text-xs w-full">
              <span>{error}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={refetch}
                className="h-6 px-2 text-xs flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Content */}
        {!loading && (
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
              <Image
                src={metadata.imageUrl || coupon.imageUrl || "/placeholder.svg"}
                alt={metadata.businessName || coupon.businessName}
                fill
                className="object-cover"
              />
              <div className="absolute top-3 right-3 bg-black/75 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-green-400" />
                {discountLabel}
              </div>
            </div>

            {/* Key Metrics / Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 border-y border-gray-200 dark:border-gray-700 py-3">
              <div className="p-3 bg-gray-50 dark:bg-gray-800/60 rounded-lg">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-green-600" />
                  <span>Valid Until</span>
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {formatDate(metadata.validUntil || coupon.expirationDate)}
                </p>
              </div>

              <div className="p-3 bg-gray-50 dark:bg-gray-800/60 rounded-lg">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <Users className="w-3.5 h-3.5 text-blue-600" />
                  <span>Capacity</span>
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {metadata.maxGuests ? `${metadata.maxGuests} Guests` : "Standard Access"}
                </p>
              </div>

              <div className="p-3 bg-gray-50 dark:bg-gray-800/60 rounded-lg col-span-2 sm:col-span-1">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <Tag className="w-3.5 h-3.5 text-purple-600" />
                  <span>Benefit</span>
                </div>
                <p className="text-sm font-semibold text-green-600 dark:text-green-400 truncate">
                  {discountLabel}
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-2">
                About this Benefit
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {metadata.description || coupon.description}
              </p>
            </div>

            {/* Business Contact Information */}
            {metadata.contact && (
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h4 className="font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                  Business Contact
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {metadata.contact.phone && (
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <Phone className="w-3.5 h-3.5 text-gray-500" />
                      <span>{metadata.contact.phone}</span>
                    </div>
                  )}
                  {metadata.contact.email && (
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <Mail className="w-3.5 h-3.5 text-gray-500" />
                      <span>{metadata.contact.email}</span>
                    </div>
                  )}
                  {metadata.contact.website && (
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 col-span-1 sm:col-span-2">
                      <Globe className="w-3.5 h-3.5 text-gray-500" />
                      <a
                        href={metadata.contact.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-green-600 dark:text-green-400 underline hover:no-underline"
                      >
                        {metadata.contact.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Terms and Conditions */}
            {metadata.termsAndConditions && metadata.termsAndConditions.length > 0 && (
              <div>
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-2 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-gray-500" />
                  Terms & Conditions
                </h3>
                <ul className="list-disc list-inside space-y-1 text-xs text-gray-600 dark:text-gray-300">
                  {metadata.termsAndConditions.map((term, i) => (
                    <li key={i}>{term}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Blackout Dates */}
            {metadata.blackoutDates && metadata.blackoutDates.length > 0 && (
              <div>
                <h4 className="font-semibold text-xs text-amber-600 dark:text-amber-400 mb-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Blackout Dates (Not Valid On)
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {metadata.blackoutDates.map((date, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 rounded text-xs"
                    >
                      {date}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Redemption Instructions */}
            {metadata.redemptionInstructions && (
              <div className="p-3 border border-green-200 dark:border-green-900 bg-green-50/50 dark:bg-green-950/20 rounded-lg">
                <h4 className="font-semibold text-xs text-green-800 dark:text-green-300 mb-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                  Redemption Instructions
                </h4>
                <p className="text-xs text-green-700 dark:text-green-400">
                  {metadata.redemptionInstructions}
                </p>
                {coupon.redemptionCode && (
                  <p className="mt-2 text-xs font-mono font-bold text-gray-900 dark:text-white">
                    Code: {coupon.redemptionCode}
                  </p>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              {onShowQR && (
                <Button
                  variant="outline"
                  onClick={() => {
                    onClose();
                    onShowQR();
                  }}
                  className="flex items-center gap-1.5"
                >
                  <QrCode className="w-4 h-4" />
                  Show QR
                </Button>
              )}
              {onRedeem && isActive && (
                <Button
                  onClick={handleRedeem}
                  disabled={redeeming}
                  className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white"
                >
                  {redeeming ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Redeeming...
                    </>
                  ) : (
                    "Redeem Now"
                  )}
                </Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default CouponDetailsModal;
