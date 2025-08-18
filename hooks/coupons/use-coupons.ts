"use client";

import { useState, useEffect, useCallback } from "react";
import type { Coupon, RedemptionResult } from "@/types/coupon";
import { CouponStatus, ActivityType } from "@/types/coupon";

export interface CouponFilters {
  search: string;
  status: "All" | CouponStatus;
  activity: "All" | keyof typeof ActivityType;
  sortBy: "expirationDate" | "acquisitionDate";
  sortOrder: "asc" | "desc";
}

const defaultFilters: CouponFilters = {
  search: "",
  status: "All",
  activity: "All",
  sortBy: "expirationDate",
  sortOrder: "asc",
};

// ✅ Create coupons inside a function (not at module scope) 
// so it doesn’t run during SSR
function createMockCoupons(): Coupon[] {
  const now = Date.now();

  return [
    {
      id: "1",
      businessName: "Hotel Chilango",
      description: "2 noches con desayuno incluido",
      activityType: ActivityType.Hotel,
      status: CouponStatus.Active,
      expirationDate: new Date(now + 1000 * 60 * 60 * 24 * 30).toISOString(),
      acquisitionDate: new Date(now - 1000 * 60 * 60 * 24 * 5).toISOString(),
      redemptionCode: "CHIL-2025-ABCD",
      userAddress: "0x1234...5678",
      imageUrl: "/coupons/hotel-chilango.jpg",
    },
    {
      id: "2",
      businessName: "Natura Lodge",
      description: "1 noche + tour de canopy",
      activityType: ActivityType.Hotel,
      status: CouponStatus.Redeemed,
      expirationDate: new Date(now + 1000 * 60 * 60 * 24 * 10).toISOString(),
      acquisitionDate: new Date(now - 1000 * 60 * 60 * 24 * 20).toISOString(),
      redemptionCode: "NTRL-2025-XY99",
      userAddress: "0x1234...5678",
      redemptionDate: new Date(now - 1000 * 60 * 60 * 24 * 10).toISOString(),
      redemptionLocation: "Natura Lodge",
      imageUrl: "/coupons/natura-lodge.jpg",
    },
    {
      id: "3",
      businessName: "Cabinas Don Samu",
      description: "Cena para dos personas",
      activityType: ActivityType.Restaurant,
      status: CouponStatus.Expired,
      expirationDate: new Date(now - 1000 * 60 * 60 * 24 * 2).toISOString(),
      acquisitionDate: new Date(now - 1000 * 60 * 60 * 24 * 40).toISOString(),
      redemptionCode: "SAMU-2024-EXP",
      userAddress: "0x1234...5678",
      imageUrl: "/coupons/cabinas-don-samu.jpg",
    },
    {
      id: "4",
      businessName: "Hotel Fumero",
      description: "Descuento 30% en estadía",
      activityType: ActivityType.Hotel,
      status: CouponStatus.Active,
      expirationDate: new Date(now + 1000 * 60 * 60 * 24 * 60).toISOString(),
      acquisitionDate: new Date(now).toISOString(),
      redemptionCode: "FUMR-2025-DISC",
      userAddress: "0x1234...5678",
      imageUrl: "/coupons/hotel-fumero.jpg",
    },
  ];
}

export function useCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CouponFilters>(defaultFilters);

  useEffect(() => {
    const loadCoupons = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        let filteredCoupons = createMockCoupons();

        // Apply filters
        if (filters.search) {
          filteredCoupons = filteredCoupons.filter(
            (coupon) =>
              coupon.businessName
                .toLowerCase()
                .includes(filters.search.toLowerCase()) ||
              coupon.description
                .toLowerCase()
                .includes(filters.search.toLowerCase())
          );
        }

        if (filters.status !== "All") {
          filteredCoupons = filteredCoupons.filter(
            (coupon) => coupon.status === filters.status
          );
        }

        if (filters.activity !== "All") {
          filteredCoupons = filteredCoupons.filter(
            (coupon) =>
              coupon.activityType ===
              ActivityType[filters.activity as keyof typeof ActivityType]
          );
        }

        // Apply sorting
        filteredCoupons.sort((a, b) => {
          const aValue = new Date(a[filters.sortBy]).getTime();
          const bValue = new Date(b[filters.sortBy]).getTime();
          return filters.sortOrder === "asc"
            ? aValue - bValue
            : bValue - aValue;
        });

        setCoupons(filteredCoupons);
        setError(null);
      } catch {
        setError("Failed to load coupons");
      } finally {
        setLoading(false);
      }
    };

    loadCoupons();
  }, [filters]);

  const redeemCoupon = useCallback(
    async (couponId: string): Promise<RedemptionResult> => {
      const coupon = coupons.find((c) => c.id === couponId);

      if (!coupon) {
        return {
          success: false,
          message: "Coupon not found",
          errorType: "invalid_coupon",
        };
      }

      if (coupon.status === CouponStatus.Redeemed) {
        return {
          success: false,
          message: "This coupon has already been redeemed",
          errorType: "already_redeemed",
        };
      }

      if (new Date(coupon.expirationDate) < new Date()) {
        return {
          success: false,
          message: "This coupon has expired",
          errorType: "expired",
        };
      }

      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // ✅ Use Date.now() safely here (only runs client-side after hydration)
        const updatedCoupon: Coupon = {
          ...coupon,
          status: CouponStatus.Redeemed,
          redemptionDate: new Date(Date.now()).toISOString(),
          redemptionLocation: coupon.businessName,
        };

        setCoupons((prev) =>
          prev.map((c) => (c.id === couponId ? updatedCoupon : c))
        );

        return {
          success: true,
          message: "Coupon redeemed successfully!",
          coupon: updatedCoupon,
        };
      } catch {
        return {
          success: false,
          message: "Network error occurred. Please try again.",
          errorType: "network_error",
        };
      }
    },
    [coupons]
  );

  return {
    coupons,
    loading,
    error,
    filters,
    setFilters,
    redeemCoupon,
  };
}
