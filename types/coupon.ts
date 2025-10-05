export interface Coupon {
  id: string;
  businessName: string;
  description: string;
  activityType: ActivityType;
  status: CouponStatus;
  expirationDate: string;
  acquisitionDate: string;
  redemptionCode?: string;
  userAddress: string;
  imageUrl?: string;
  redemptionDate?: string;
  redemptionLocation?: string;
}

export enum CouponStatus {
  Active = "Active",
  Redeemed = "Redeemed",
  Expired = "Expired",
}

export enum ActivityType {
  Hotel = "Hotel",
  Restaurant = "Restaurant",
  Tour = "Tour",
  Cultural = "Cultural",
}

export interface RedemptionResult {
  success: boolean;
  message: string;
  coupon?: Coupon;
  error?: string;
  errorType?:
    | "expired"
    | "already_redeemed"
    | "network_error"
    | "invalid_coupon"
    | "unknown";
}
