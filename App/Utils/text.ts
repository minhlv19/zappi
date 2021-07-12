import { Discount } from 'App/Types/discount';
import moment from 'moment';
import { DEFAULT_DATE_FORMAT_TO_USER } from './constants';
import i18n from 'i18next';

export const getProductDisplayStatus = (displayProductEnabled: boolean, isFnB: boolean) => {
  if (isFnB) {
    return displayProductEnabled ? 'In Stock' : 'Out Of Stock';
  } else {
    return displayProductEnabled ? 'Online' : 'Offline';
  }
};

export const getDiscountValidTimeDisplayText = (discount: Discount) => {
  if (!discount.validThru || moment(discount.validThru).isBefore(moment(discount.validFrom))) {
    return i18n.t('Valid from {{date}}', { date: moment(discount.validFrom).format(DEFAULT_DATE_FORMAT_TO_USER) });
  }

  if (discount.validThru) {
    if (moment(discount.validThru).isAfter(moment())) {
      return i18n.t('Expired on {{date}}', { date: moment(discount.validThru).format(DEFAULT_DATE_FORMAT_TO_USER) });
    } else {
      return i18n.t('Valid from {{fromDate}} to {{toDate}}', {
        fromDate: moment(discount.validFrom).format(DEFAULT_DATE_FORMAT_TO_USER),
        toDate: moment(discount.validThru).format(DEFAULT_DATE_FORMAT_TO_USER),
      });
    }
  }
};
