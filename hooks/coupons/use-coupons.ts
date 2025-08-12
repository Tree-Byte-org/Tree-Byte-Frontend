"use client";

import { useEffect, useMemo, useState } from "react";
import type { Coupon } from "@/types/coupon";
import { ActivityType, CouponStatus } from "@/types/coupon";
import { useGlobalAuthenticationStore } from "@/data";

export type CouponFilters = {
  status: "All" | keyof typeof CouponStatus;
  activity: "All" | keyof typeof ActivityType;
  sortBy: "expirationDate" | "acquisitionDate";
  sortOrder: "asc" | "desc";
  search: string;
};

const mockCoupons: Coupon[] = [
  {
    id: "1",
    userAddress: "",
    businessName: "Hotel Chilango",
    activityType: ActivityType.Hotel,
    description: "2 noches con desayuno incluido",
    status: CouponStatus.Active,
    expirationDate: new Date(
      Date.now() + 1000 * 60 * 60 * 24 * 30
    ).toISOString(),
    acquisitionDate: new Date(
      Date.now() - 1000 * 60 * 60 * 24 * 5
    ).toISOString(),
    imageUrl: "/coupons/hotel-chilango.jpg",
    redemptionCode: "CHIL-2025-ABCD",
  },
  {
    id: "2",
    userAddress: "",
    businessName: "Natura Lodge",
    activityType: ActivityType.Hotel,
    description: "1 noche + tour de canopy",
    status: CouponStatus.Redeemed,
    expirationDate: new Date(
      Date.now() + 1000 * 60 * 60 * 24 * 10
    ).toISOString(),
    acquisitionDate: new Date(
      Date.now() - 1000 * 60 * 60 * 24 * 20
    ).toISOString(),
    imageUrl: "/coupons/natura-lodge.jpg",
    redemptionCode: "NTRL-2025-XY99",
  },
  {
    id: "3",
    userAddress: "",
    businessName: "Cabinas Don Samu",
    activityType: ActivityType.Restaurant,
    description: "Cena para dos personas",
    status: CouponStatus.Expired,
    expirationDate: new Date(
      Date.now() - 1000 * 60 * 60 * 24 * 2
    ).toISOString(),
    acquisitionDate: new Date(
      Date.now() - 1000 * 60 * 60 * 24 * 40
    ).toISOString(),
    imageUrl: "/coupons/cabinas-don-samu.jpg",
    redemptionCode: "SAMU-2024-EXP",
  },
  {
    id: "4",
    userAddress: "",
    businessName: "Hotel Fumero",
    activityType: ActivityType.Hotel,
    description: "Descuento 30% en estadía",
    status: CouponStatus.Active,
    expirationDate: new Date(
      Date.now() + 1000 * 60 * 60 * 24 * 60
    ).toISOString(),
    acquisitionDate: new Date().toISOString(),
    imageUrl: "/coupons/hotel-fumero.jpg",
  },
];

export function useCoupons(initialFilters?: Partial<CouponFilters>) {
  const address = useGlobalAuthenticationStore((s) => s.address);

  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CouponFilters>({
    status: "All",
    activity: "All",
    sortBy: "expirationDate",
    sortOrder: "asc",
    search: "",
    ...initialFilters,
  });

  useEffect(() => {
    setLoading(true);
    setError(null);
    // Simulate API fetch and assign user address to items
    const timer = setTimeout(() => {
      try {
        const withAddress = mockCoupons.map((c) => ({
          ...c,
          userAddress: address,
        }));
        setCoupons(withAddress);
      } catch (e) {
        setError("No se pudieron obtener los cupones");
      } finally {
        setLoading(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [address]);

  const filtered = useMemo(() => {
    let list = [...coupons];

    if (filters.status !== "All") {
      list = list.filter(
        (c) =>
          c.status === CouponStatus[filters.status as keyof typeof CouponStatus]
      );
    }

    if (filters.activity !== "All") {
      list = list.filter(
        (c) =>
          c.activityType ===
          ActivityType[filters.activity as keyof typeof ActivityType]
      );
    }

    if (filters.search.trim()) {
      const term = filters.search.trim().toLowerCase();
      list = list.filter((c) => c.businessName.toLowerCase().includes(term));
    }

    list.sort((a, b) => {
      const aDate = new Date(a[filters.sortBy]).getTime();
      const bDate = new Date(b[filters.sortBy]).getTime();
      return filters.sortOrder === "asc" ? aDate - bDate : bDate - aDate;
    });

    return list;
  }, [coupons, filters]);

  return {
    coupons: filtered,
    rawCoupons: coupons,
    loading,
    error,
    filters,
    setFilters,
  } as const;
}
