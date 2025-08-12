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

export interface Coupon {
  id: string;
  userAddress: string;
  businessName: string;
  activityType: ActivityType;
  description: string;
  status: CouponStatus;
  expirationDate: string;
  acquisitionDate: string;
  imageUrl?: string;
  redemptionCode?: string;
}
