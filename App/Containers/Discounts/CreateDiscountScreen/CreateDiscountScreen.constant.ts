import { StyleDropdownRowData } from 'App/Components/StyledDropdownSelect/StyledDropdownSelect';
import { DiscountRuleType } from 'App/Types/discount';
import {
  AppliesToEnums,
  CustomerBuysOptionEnums,
  CustomerGetsOfferOptionEnums,
  EligibilityOptionEnums,
  MinimumRequirementOptionEnums,
} from './CreateDiscountScreen.type';

export const DiscountTypeOptions: StyleDropdownRowData[] = [
  {
    title: 'Percentage',
    value: DiscountRuleType.PERCENTAGE,
  },
  {
    title: 'Fixed amount',
    value: DiscountRuleType.FIXED_AMOUNT,
  },
  {
    title: 'Free shipping',
    value: DiscountRuleType.FREE_SHIP,
  },
  {
    title: 'Buy X get Y',
    value: DiscountRuleType.BUY_X_GET_Y,
  },
];

export const AppliesToOptions: StyleDropdownRowData[] = [
  {
    title: 'All Products',
    value: AppliesToEnums.ALL_PRODUCTS,
  },
  {
    title: 'Specific Product Categories',
    value: AppliesToEnums.SPECIFIC_PRODUCT_CATEGORIES,
  },
  {
    title: 'Specific Products',
    value: AppliesToEnums.SPECIFIC_PRODUCTS,
  },
];

export const MinimumRequirementOptions: StyleDropdownRowData[] = [
  {
    title: 'Minimum purchase amount',
    value: MinimumRequirementOptionEnums.MINIMUM_PURCHASE_AMOUNT,
  },
  {
    title: 'Minimum quantity',
    value: MinimumRequirementOptionEnums.MINIMUM_QUANTITY,
  },
];

export const CustomerBuysOptions: StyleDropdownRowData[] = [
  {
    title: 'Minimum quantity of items',
    value: CustomerBuysOptionEnums.MINIMUM_QUANTITY_OF_ITEMS,
  },
  {
    title: 'Minimum purchase amount',
    value: CustomerBuysOptionEnums.MINIMUM_PURCHASE_AMOUNT,
  },
];

export const CustomerGetsOfferOptions: StyleDropdownRowData[] = [
  {
    title: 'Free',
    value: CustomerGetsOfferOptionEnums.FREE,
  },
  {
    title: 'Percentage discount',
    value: CustomerGetsOfferOptionEnums.PERCENTAGE_DISCOUNT,
  },
];

export const EligibilityOptions: StyleDropdownRowData[] = [
  {
    title: 'Everyone',
    value: EligibilityOptionEnums.EVERYONE,
  },
  {
    title: 'Specific customers',
    value: EligibilityOptionEnums.SPECIFIC_CUSTOMERS,
  },
];
