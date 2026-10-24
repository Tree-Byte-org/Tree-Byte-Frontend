export interface BusinessContact {
  email?: string;
  phone?: string;
  website?: string;
}

export interface CouponMetadata {
  businessName?: string;
  businessAddress?: string;
  contact?: BusinessContact;
  activityType?: ActivityType | string;
  description?: string;
  discountPercentage?: number;
  discountAmount?: number;
  discountCurrency?: string;
  validFrom?: string;
  validUntil?: string;
  termsAndConditions?: string[];
  redemptionInstructions?: string;
  maxGuests?: number;
  blackoutDates?: string[];
  imageUrl?: string;
}

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
  ipfsUrl?: string;
  metadata?: CouponMetadata;
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
