import { Discount } from 'App/Types/discount';

export enum AppliesToEnums {
  ALL_PRODUCTS = 'ALL_PRODUCTS',
  SPECIFIC_PRODUCT_CATEGORIES = 'SPECIFIC_PRODUCT_CATEGORIES',
  SPECIFIC_PRODUCTS = 'SPECIFIC_PRODUCTS',
}

export enum MinimumRequirementOptionEnums {
  MINIMUM_PURCHASE_AMOUNT = 'MINIMUM_PURCHASE_AMOUNT',
  MINIMUM_QUANTITY = 'MINIMUM_QUANTITY',
}

export enum CustomerBuysOptionEnums {
  MINIMUM_PURCHASE_AMOUNT = 'MINIMUM_PURCHASE_AMOUNT',
  MINIMUM_QUANTITY_OF_ITEMS = 'MINIMUM_QUANTITY_OF_ITEMS',
}

export enum CustomerGetsOfferOptionEnums {
  FREE = 'FREE',
  PERCENTAGE_DISCOUNT = 'PERCENTAGE_DISCOUNT',
}

export enum EligibilityOptionEnums {
  EVERYONE = 'EVERYONE',
  SPECIFIC_CUSTOMERS = 'SPECIFIC_CUSTOMERS',
}

export interface AddDiscountScreenRouteProps {
  params: {
    isEditing?: boolean;
    existingDiscount?: Partial<Discount> | undefined;
    enableEndDate?: boolean;
  };
}
