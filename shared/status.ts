import { CouponStatus } from "@/types/coupon";

export function statusStyles(status: CouponStatus) {
  switch (status) {
    case CouponStatus.Active:
      return { badge: "bg-green-500 text-white", card: "", image: "" };
    case CouponStatus.Redeemed:
      return {
        badge: "bg-gray-400 text-white",
        card: "opacity-80",
        image: "grayscale",
      };
    case CouponStatus.Expired:
      return {
        badge: "bg-red-500 text-white",
        card: "opacity-70",
        image: "grayscale",
      };
    default:
      return { badge: "", card: "", image: "" };
  }
}
