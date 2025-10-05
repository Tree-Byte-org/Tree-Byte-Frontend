"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CouponFilters } from "@/hooks/coupons/use-coupons";

interface Props {
  filters: CouponFilters;
  onChange: (next: Partial<CouponFilters>) => void;
}

/**
 * Filter controls for coupon listings with search, status, activity, and sort options.
 * Uses a responsive grid layout that adapts from single column to multi-column on larger screens.
 */
export function CouponFilter({ filters, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {/* Search field - takes 2 columns on desktop */}
      <div className="md:col-span-2">
        <Label className="mb-1 block">Search</Label>
        <Input
          placeholder="Search by business name..."
          value={filters.search}
          onChange={(e) => onChange({ search: e.target.value })}
        />
      </div>

      {/* Status filter dropdown */}
      <div>
        <Label className="mb-1 block">Status</Label>
        <Select
          value={filters.status}
          onValueChange={(v) =>
            onChange({ status: v as CouponFilters["status"] })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Redeemed">Redeemed</SelectItem>
            <SelectItem value="Expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Activity type filter dropdown */}
      <div>
        <Label className="mb-1 block">Activity</Label>
        <Select
          value={filters.activity as string}
          onValueChange={(v) =>
            onChange({ activity: v as CouponFilters["activity"] })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Hotel">Hotel</SelectItem>
            <SelectItem value="Restaurant">Restaurant</SelectItem>
            <SelectItem value="Tour">Tour</SelectItem>
            <SelectItem value="Cultural">Cultural</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sort controls with field and direction selection */}
      <div>
        <Label className="mb-1 block">Sort</Label>
        <div className="flex gap-2">
          <Select
            value={filters.sortBy}
            onValueChange={(v) =>
              onChange({ sortBy: v as CouponFilters["sortBy"] })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="expirationDate">Expiration date</SelectItem>
              <SelectItem value="acquisitionDate">Acquisition date</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={filters.sortOrder}
            onValueChange={(v) =>
              onChange({ sortOrder: v as CouponFilters["sortOrder"] })
            }
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Asc</SelectItem>
              <SelectItem value="desc">Desc</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Reset button - full width on mobile, right-aligned on desktop */}
      <div className="md:col-span-5 flex justify-end">
        <Button
          variant="ghost"
          onClick={() =>
            onChange({
              status: "All",
              activity: "All",
              sortBy: "expirationDate",
              sortOrder: "asc",
              search: "",
            })
          }
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

export default CouponFilter;
