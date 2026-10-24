import { describe, it, expect } from "vitest";
import { resolveIpfsUrl, buildFallbackMetadata } from "@/hooks/coupons/use-coupon-metadata";
import { CouponStatus, ActivityType, type Coupon } from "@/types/coupon";

describe("Coupon Details & IPFS Integration", () => {
  const mockCoupon: Coupon = {
    id: "test-coupon-1",
    businessName: "Eco Lodge Monteverde",
    description: "Exclusive 2-night stay with canopy tour",
    activityType: ActivityType.Hotel,
    status: CouponStatus.Active,
    expirationDate: "2026-12-31T23:59:59.000Z",
    acquisitionDate: "2026-01-01T00:00:00.000Z",
    redemptionCode: "ECO-2026-TEST",
    userAddress: "GBX...1234",
    imageUrl: "/coupons/eco-lodge.jpg",
    redemptionLocation: "Monteverde, Puntarenas",
    ipfsUrl: "ipfs://bafybeiccouponmetadatahash123/metadata.json",
  };

  describe("resolveIpfsUrl", () => {
    it("should resolve ipfs:// protocol to public gateways", () => {
      const urls = resolveIpfsUrl("ipfs://bafybeihash123/metadata.json");
      expect(urls.length).toBeGreaterThanOrEqual(1);
      expect(urls[0]).toBe("https://ipfs.io/ipfs/bafybeihash123/metadata.json");
      expect(urls.some((u) => u.includes("pinata"))).toBe(true);
    });

    it("should preserve direct http or https URLs", () => {
      const httpUrl = "https://example.com/metadata.json";
      const resolved = resolveIpfsUrl(httpUrl);
      expect(resolved).toEqual([httpUrl]);
    });

    it("should handle empty or undefined URL gracefully", () => {
      expect(resolveIpfsUrl(undefined)).toEqual([]);
      expect(resolveIpfsUrl("")).toEqual([]);
    });
  });

  describe("buildFallbackMetadata", () => {
    it("should correctly populate all required metadata fields from coupon", () => {
      const fallback = buildFallbackMetadata(mockCoupon);

      expect(fallback.businessName).toBe("Eco Lodge Monteverde");
      expect(fallback.description).toBe("Exclusive 2-night stay with canopy tour");
      expect(fallback.activityType).toBe(ActivityType.Hotel);
      expect(fallback.validFrom).toBe("2026-01-01T00:00:00.000Z");
      expect(fallback.validUntil).toBe("2026-12-31T23:59:59.000Z");
      expect(fallback.businessAddress).toBe("Monteverde, Puntarenas");
      expect(fallback.imageUrl).toBe("/coupons/eco-lodge.jpg");
      expect(fallback.termsAndConditions?.length).toBeGreaterThan(0);
      expect(fallback.redemptionInstructions).toBeDefined();
    });
  });
});
