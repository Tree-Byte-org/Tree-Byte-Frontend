"use client";

import { useState, useEffect, useCallback } from "react";
import type { Coupon, CouponMetadata } from "@/types/coupon";

const IPFS_GATEWAYS = [
  "https://ipfs.io/ipfs/",
  "https://gateway.pinata.cloud/ipfs/",
  "https://cloudflare-ipfs.com/ipfs/",
];

export function resolveIpfsUrl(url?: string): string[] {
  if (!url) return [];
  if (url.startsWith("ipfs://")) {
    const path = url.replace("ipfs://", "");
    return IPFS_GATEWAYS.map((gateway) => `${gateway}${path}`);
  }
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return [url];
  }
  return IPFS_GATEWAYS.map((gateway) => `${gateway}${url}`);
}

export function buildFallbackMetadata(coupon: Coupon): CouponMetadata {
  return {
    businessName: coupon.businessName,
    businessAddress: coupon.redemptionLocation || "Costa Rica",
    activityType: coupon.activityType,
    description: coupon.description,
    validFrom: coupon.acquisitionDate,
    validUntil: coupon.expirationDate,
    imageUrl: coupon.imageUrl,
    termsAndConditions: [
      "Must be redeemed prior to expiration date.",
      "Valid only at participating partner locations.",
      "Non-transferable and non-refundable.",
    ],
    redemptionInstructions:
      "Present this coupon and the verification QR code at the business counter upon arrival.",
  };
}

export function useCouponMetadata(coupon: Coupon) {
  const [metadata, setMetadata] = useState<CouponMetadata>(() => {
    return coupon.metadata || buildFallbackMetadata(coupon);
  });
  const [loading, setLoading] = useState<boolean>(Boolean(coupon.ipfsUrl && !coupon.metadata));
  const [error, setError] = useState<string | null>(null);

  const fetchMetadata = useCallback(async () => {
    if (coupon.metadata) {
      setMetadata(coupon.metadata);
      setLoading(false);
      setError(null);
      return;
    }

    if (!coupon.ipfsUrl) {
      setMetadata(buildFallbackMetadata(coupon));
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    const candidateUrls = resolveIpfsUrl(coupon.ipfsUrl);
    let fetched = false;

    for (const url of candidateUrls) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (res.ok) {
          const json = await res.json();
          if (json && typeof json === "object") {
            const fallback = buildFallbackMetadata(coupon);
            const merged: CouponMetadata = {
              businessName: json.businessName || fallback.businessName,
              businessAddress: json.businessAddress || fallback.businessAddress,
              contact: json.contact || json.businessContact,
              activityType: json.activityType || fallback.activityType,
              description: json.description || fallback.description,
              discountPercentage:
                typeof json.discountPercentage === "number"
                  ? json.discountPercentage
                  : undefined,
              discountAmount:
                typeof json.discountAmount === "number"
                  ? json.discountAmount
                  : undefined,
              discountCurrency: json.discountCurrency || "USD",
              validFrom: json.validFrom || fallback.validFrom,
              validUntil: json.validUntil || fallback.validUntil,
              termsAndConditions: Array.isArray(json.termsAndConditions)
                ? json.termsAndConditions
                : fallback.termsAndConditions,
              redemptionInstructions:
                json.redemptionInstructions || fallback.redemptionInstructions,
              maxGuests:
                typeof json.maxGuests === "number" ? json.maxGuests : undefined,
              blackoutDates: Array.isArray(json.blackoutDates)
                ? json.blackoutDates
                : undefined,
              imageUrl: json.imageUrl || fallback.imageUrl,
            };

            setMetadata(merged);
            fetched = true;
            break;
          }
        }
      } catch (e) {
        // Try next gateway
      }
    }

    if (!fetched) {
      setError("Failed to fetch IPFS metadata. Showing default coupon details.");
      setMetadata(buildFallbackMetadata(coupon));
    }
    setLoading(false);
  }, [coupon]);

  useEffect(() => {
    fetchMetadata();
  }, [fetchMetadata]);

  return { metadata, loading, error, refetch: fetchMetadata };
}
