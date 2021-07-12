export enum DiscountType {
  MANUAL = 'manual',
  AUTOMATIC = 'automatic',
}

export enum DiscountRuleType {
  PERCENTAGE = 'percentage',
  FIXED_AMOUNT = 'fixed_amount',
  FREE_SHIP = 'free_ship',
  BUY_X_GET_Y = 'buy_x_get_y',
}

export type DiscountApplicability = {
  allProductEnabled: boolean;
  categoryIds: string[];
  productIds: string[];
};

export type DiscountUsageLimit = {
  oneUsePerCustomerEnabled: boolean;
  totalUseLimit?: number;
};

export type Discount = {
  id: string;
  storeId: string;
  code: string;
  details: string;
  slug?: string;
  enabled: boolean;
  type: DiscountType;
  ruleType: DiscountRuleType;
  useCount: number;
  validFrom: Date;
  validThru: Date;
  applicability: DiscountApplicability;
  eligibility: DiscountEligibility | null;
  minQuantity: number;
  minPurchaseAmt: number;
  usageLimit?: DiscountUsageLimit;
  rule: DiscountRule;
  createdAt: string;
};

export type BuyXGetYDiscountRule = {
  xMinQuantity: number;
  xMinPurchase: number;
  xProductIds: string[];
  yProductIds: string[];
  yQuantity: number;
  yPercentageOff: number;
  type: DiscountRuleType;
};

export type FixedAmountDiscountRule = {
  amount: number;
  type: DiscountRuleType;
};

export type PercentageDiscountRule = {
  percentage: number;
  type: DiscountRuleType;
};

export type DiscountRule = BuyXGetYDiscountRule | FixedAmountDiscountRule | PercentageDiscountRule;

export type DiscountEligibility = {
  everyOneEnabled: boolean;
  customerIds: string[];
};

export type DiscountFilterInputParams = {
  searchText?: string;
  type?: DiscountType;
};
