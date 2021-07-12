import { BuyXGetYDiscountRule, Discount, DiscountRuleType } from 'App/Types/discount';
import moment from 'moment';
import {
  AppliesToEnums,
  CustomerBuysOptionEnums,
  CustomerGetsOfferOptionEnums,
  EligibilityOptionEnums,
  MinimumRequirementOptionEnums,
} from './CreateDiscountScreen.type';

export const getAppliesToDefaultState = (discountToCreate: Partial<Discount> | undefined) => {
  if (!discountToCreate?.applicability) return AppliesToEnums.ALL_PRODUCTS;
  if (discountToCreate.applicability.allProductEnabled) return AppliesToEnums.ALL_PRODUCTS;
  if (discountToCreate.applicability.productIds?.length > 0) return AppliesToEnums.SPECIFIC_PRODUCTS;
  if (discountToCreate.applicability.categoryIds?.length > 0) return AppliesToEnums.SPECIFIC_PRODUCT_CATEGORIES;
};

export const getMinimumRequirementDefaultState = (discountToCreate: Partial<Discount> | undefined) => {
  if (!discountToCreate) return undefined;
  if (discountToCreate.minQuantity) return MinimumRequirementOptionEnums.MINIMUM_QUANTITY;
  if (discountToCreate.minPurchaseAmt) return MinimumRequirementOptionEnums.MINIMUM_PURCHASE_AMOUNT;
};

export const getEligibilityDefaultState = (discountToCreate: Partial<Discount> | undefined) => {
  if (!discountToCreate) return undefined;
  if (discountToCreate.eligibility?.everyOneEnabled) return EligibilityOptionEnums.EVERYONE;
  if (discountToCreate.eligibility?.customerIds?.length) return EligibilityOptionEnums.SPECIFIC_CUSTOMERS;
};

export const getEnableTotalUseDefaultState = (discountToCreate: Partial<Discount> | undefined) => {
  if (discountToCreate && discountToCreate.usageLimit?.totalUseLimit) return true;
  return false;
};

export const getEnableSetEndDateDefaultState = (discountToCreate: Partial<Discount> | undefined) => {
  if (
    discountToCreate &&
    discountToCreate.validThru &&
    moment(discountToCreate.validThru).isAfter(moment(discountToCreate.validFrom))
  )
    return true;
  return false;
};

export const getCustomerBuysDefaultState = (discountToCreate: Partial<Discount> | undefined) => {
  if (!discountToCreate || discountToCreate.rule?.type != DiscountRuleType.BUY_X_GET_Y)
    return CustomerBuysOptionEnums.MINIMUM_QUANTITY_OF_ITEMS;
  const discountRule = discountToCreate.rule as BuyXGetYDiscountRule;
  if (discountRule.xMinQuantity) return CustomerBuysOptionEnums.MINIMUM_QUANTITY_OF_ITEMS;
  if (discountRule.xMinPurchase) return CustomerBuysOptionEnums.MINIMUM_PURCHASE_AMOUNT;
};

export const getCustomerOfferDefaultState = (discountToCreate: Partial<Discount> | undefined) => {
  if (!discountToCreate || discountToCreate.rule?.type != DiscountRuleType.BUY_X_GET_Y)
    return CustomerGetsOfferOptionEnums.FREE;
  const discountRule = discountToCreate.rule as BuyXGetYDiscountRule;
  if (discountRule.yPercentageOff < 100) {
    return CustomerGetsOfferOptionEnums.PERCENTAGE_DISCOUNT;
  } else {
    return CustomerGetsOfferOptionEnums.FREE;
  }
};
