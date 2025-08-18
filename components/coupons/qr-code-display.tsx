"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Copy, CheckCircle, AlertCircle } from "lucide-react";
import QRCode from "qrcode";
import type { Coupon } from "@/types/coupon";

interface QRData {
  couponId: string;
  businessName: string;
  redemptionCode?: string;
  expirationDate: string;
  userAddress: string;
  verificationUrl: string;
  fallbackCode: string;
}

interface QRCodeDisplayProps {
  coupon: Coupon;
  onDownload?: () => void;
}

export default function QRCodeDisplay({
  coupon,
  onDownload,
}: QRCodeDisplayProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate fallback verification code
  const fallbackCode = `${coupon.id
    .slice(-4)
    .toUpperCase()}-${coupon.businessName
    .replace(/\s+/g, "")
    .slice(0, 4)
    .toUpperCase()}`;

  const qrData: QRData = {
    couponId: coupon.id,
    businessName: coupon.businessName,
    redemptionCode: coupon.redemptionCode,
    expirationDate: coupon.expirationDate,
    userAddress: coupon.userAddress,
    verificationUrl: `${
      process.env.NEXT_PUBLIC_APP_URL || "https://app.example.com"
    }/verify/${coupon.id}`,
    fallbackCode,
  };

  useEffect(() => {
    generateQRCode();
  }, []);

  const generateQRCode = async () => {
    setLoading(true);
    try {
      const qrString = JSON.stringify(qrData);
      const url = await QRCode.toDataURL(qrString, {
        width: 800, // Higher resolution for better scanning
        margin: 4,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });
      setQrCodeUrl(url);
    } catch (error) {
      console.error("Error generating QR code:", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;

    // Convert the Base64 DataURL into a Blob
    fetch(qrCodeUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `coupon-qr-${coupon.businessName
          .replace(/\s+/g, "-")
          .toLowerCase()}.png`;

        document.body.appendChild(link); // safer in Safari
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url); // cleanup
        onDownload?.();
      })
      .catch((err) => {
        console.error("Failed to download QR code:", err);
      });
  };

  const copyFallbackCode = async () => {
    try {
      await navigator.clipboard.writeText(fallbackCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <>
      <Card className="mb-8 bg-white dark:bg-black border-gray-200 dark:border-gray-700">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                {coupon.businessName}
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-300 mt-2 text-base">
                {coupon.description}
              </p>
            </div>
            <Badge className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800 px-3 py-1">
              {coupon.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Activity Type
              </p>
              <p className="font-semibold text-gray-900 dark:text-white mt-1">
                {coupon.activityType}
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Expires
              </p>
              <p className="font-semibold text-gray-900 dark:text-white mt-1">
                {new Date(coupon.expirationDate).toLocaleDateString()}
              </p>
            </div>
            {coupon.redemptionCode && (
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  Redemption Code
                </p>
                <p className="font-mono font-semibold text-gray-900 dark:text-white mt-1">
                  {coupon.redemptionCode}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-5 gap-8 mb-8">
        <div className="lg:col-span-2">
          <Card className="bg-white dark:bg-black border-gray-200 dark:border-gray-700 h-full">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                QR Code
              </CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Scan to verify coupon
              </p>
            </CardHeader>
            <CardContent className="flex flex-col items-center px-4 sm:px-8 pb-8">
              {loading ? (
                <div className="w-full max-w-xs aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white mx-auto mb-4"></div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Generating QR code...
                    </p>
                  </div>
                </div>
              ) : qrCodeUrl ? (
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 w-full max-w-xs">
                  <div className="relative aspect-square w-full">
                    <Image
                      src={qrCodeUrl}
                      alt={`QR Code for ${coupon.businessName}`}
                      fill
                      className="rounded-lg"
                      priority
                      quality={100}
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 320px"
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-xs aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 dark:text-gray-400">
                      Failed to generate QR code
                    </p>
                  </div>
                </div>
              )}

              {qrCodeUrl && (
                <Button
                  onClick={downloadQRCode}
                  variant="outline"
                  size="lg"
                  className="mt-6 border-gray-200 dark:border-gray-700 bg-transparent px-6 py-3 w-full max-w-xs"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download QR Code
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <Card className="bg-white dark:bg-black border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                For Business Staff
              </CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                How to verify this coupon
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Scan the QR code
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Use your verification app to scan the code
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Verify details
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Confirm coupon details match your system
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Check expiration
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Ensure the coupon hasn't expired
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                Manual Verification
              </CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Backup verification method
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                If QR scanning fails, use this verification code:
              </p>
              <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-600">
                <code className="font-mono text-xl font-bold text-gray-900 dark:text-white flex-1 tracking-wider">
                  {fallbackCode}
                </code>
                <Button
                  onClick={copyFallbackCode}
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 p-0"
                >
                  {copied ? (
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Enter this code in your verification system if QR scanning is
                unavailable
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          onClick={downloadQRCode}
          disabled={!qrCodeUrl}
          size="lg"
          className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 py-3"
        >
          <Download className="w-5 h-5 mr-2" />
          Save QR Code
        </Button>
      </div>
    </>
  );
}
