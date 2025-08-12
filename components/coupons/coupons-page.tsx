"use client";

import { useState } from "react";
import { useCoupons, type CouponFilters } from "@/hooks/coupons/use-coupons";
import CouponCard from "@/components/coupons/coupon-card";
import CouponFilter from "@/components/coupons/coupon-filter";
import { Card } from "@/components/ui/card";

export default function CouponsPage() {
  const { coupons, loading, error, filters, setFilters } = useCoupons();
  const [localFilters, setLocalFilters] = useState<CouponFilters>(filters);

  const handleChange = (next: Partial<CouponFilters>) => {
    const updated = { ...localFilters, ...next } as CouponFilters;
    setLocalFilters(updated);
    setFilters(updated);
  };

  return (
    <section className="bg-gray-50 dark:bg-black px-6 py-16 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            My Coupons
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Tourism benefits from your tokens
          </p>
        </div>

        <Card className="p-4 mb-6 bg-white dark:bg-black border-gray-200 dark:border-gray-700">
          <CouponFilter filters={localFilters} onChange={handleChange} />
        </Card>

        {loading && (
          <p className="text-gray-700 dark:text-gray-200">Loading coupons...</p>
        )}
        {error && (
          <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coupons.map((c) => (
              <CouponCard key={c.id} coupon={c} />
            ))}
          </div>
        )}

        {!loading && !error && coupons.length === 0 && (
          <p className="text-gray-700 dark:text-gray-200">No coupons found.</p>
        )}
      </div>
    </section>
  );
}
