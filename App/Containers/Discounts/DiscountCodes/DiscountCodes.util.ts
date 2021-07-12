import {
  BuyXGetYDiscountRule,
  Discount,
  DiscountRuleType,
  FixedAmountDiscountRule,
  PercentageDiscountRule,
} from 'App/Types/discount';

import i18n from 'i18next';

export const getDiscountDetailText = (discount: Discount) => {
  if (discount.applicability.allProductEnabled) {
    if (discount.rule.type == DiscountRuleType.PERCENTAGE) {
      return i18n.t('{{x}}% off on all items', { x: (discount.rule as PercentageDiscountRule).percentage });
    }

    if (discount.rule.type == DiscountRuleType.FIXED_AMOUNT) {
      return i18n.t('{{currency}} {{x}} off on all items', {
        x: (discount.rule as FixedAmountDiscountRule).amount,
        currency: 'THB',
      });
    }

    if (discount.rule.type == DiscountRuleType.FREE_SHIP) {
      return i18n.t('Free shipping on all items');
    }

    if (discount.rule.type == DiscountRuleType.BUY_X_GET_Y) {
      let discountRule = discount.rule as BuyXGetYDiscountRule;
      return i18n.t('Buy {{x}} get {{y}}', {
        x: discountRule.xMinQuantity > 0 ? discountRule.xMinQuantity : `${discountRule.xMinPurchase} THB`,
        y: discountRule.yQuantity > 0 ? discountRule.yQuantity : 0,
      });
    }
  }

  return i18n.t('Discount details');
};
