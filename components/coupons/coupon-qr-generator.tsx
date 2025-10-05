import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QrCode, AlertCircle } from "lucide-react";
import type { Coupon } from "@/types/coupon";
import { CouponStatus } from "@/types/coupon";
import QRCodeDisplay from "./qr-code-display";

interface CouponQRGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  coupon: Coupon;
}

/**
 * Main QR Generator Modal Component
 *
 * Handles the modal dialog for QR code generation and validation.
 * Only displays QR codes for active coupons, shows error state for inactive ones.
 *
 * @param isOpen - Controls modal visibility
 * @param onClose - Callback to close the modal
 * @param coupon - Coupon data for QR generation
 */
export default function CouponQRGenerator({
  isOpen,
  onClose,
  coupon,
}: CouponQRGeneratorProps) {
  const isActive = coupon.status === CouponStatus.Active;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto p-8 rounded-xl bg-black border-gray-600">
        {/* Modal Header */}
        <DialogHeader className="mb-8 text-center">
          <DialogTitle className="text-3xl font-bold text-white flex items-center justify-center gap-3">
            <QrCode className="w-8 h-8 text-white" />
            QR Code for Redemption
          </DialogTitle>
          <p className="text-base text-gray-300 mt-2">
            Show this QR code at the business location for verification
          </p>
        </DialogHeader>

        {/* Conditional Content Based on Coupon Status */}
        {!isActive ? (
          <InactiveCouponMessage onClose={onClose} />
        ) : (
          <ActiveCouponContent coupon={coupon} onClose={onClose} />
        )}
      </DialogContent>
    </Dialog>
  );
}

/**
 * Error Message Component for Inactive Coupons
 *
 * Displays a user-friendly error message when trying to generate
 * QR codes for non-active coupons.
 */
function InactiveCouponMessage({ onClose }: { onClose: () => void }) {
  return (
    <Card className="bg-red-950/50 border-red-700 mx-auto max-w-md">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 text-red-300">
          <AlertCircle className="w-6 h-6" />
          <p className="font-medium text-lg">QR Code Not Available</p>
        </div>
        <p className="text-red-400 mt-2">
          QR codes can only be generated for active coupons.
        </p>
        <div className="mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            size="lg"
            className="w-full border-red-600 text-red-300 bg-transparent hover:bg-red-950/30"
          >
            Close
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Active Coupon Content Component
 *
 * Renders the QR code display and close button for active coupons.
 */
function ActiveCouponContent({
  coupon,
  onClose,
}: {
  coupon: Coupon;
  onClose: () => void;
}) {
  return (
    <>
      {/* QR Code Display Component */}
      <QRCodeDisplay coupon={coupon} />

      {/* Modal Footer */}
      <div className="flex justify-center pt-4 border-t border-gray-600">
        <Button
          variant="outline"
          onClick={onClose}
          size="lg"
          className="px-8 border-gray-500 text-gray-300 bg-transparent hover:bg-gray-800 py-3"
        >
          Close
        </Button>
      </div>
    </>
  );
}
