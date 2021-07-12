import { Discount, DiscountFilterInputParams } from 'App/Types/discount';
import { cloneDeep } from 'lodash';
import { RootStateDefault } from '..';
import { DiscountActions, IDiscountGeneralAction } from './DiscountActions';

export interface DiscountReduxState {
  discounts: Discount[];
  displayedDiscounts: Discount[];
  selectedDiscount?: Discount;
  discountToCreate: Partial<Discount>;
  displayFilter: DiscountFilterInputParams;
}

const DiscountReducer = (
  state = RootStateDefault.discount,
  action: IDiscountGeneralAction<any>,
): DiscountReduxState => {
  switch (action.type) {
    case DiscountActions.SET_DISCOUNTS_DATA:
      return {
        ...state,
        discounts: action.data as Discount[],
      };

    case DiscountActions.SET_DISPLAYED_DISCOUNTS_DATA:
      return {
        ...state,
        displayedDiscounts: action.data as Discount[],
      };

    case DiscountActions.CLEAR_DISCOUNT_DATA:
      return RootStateDefault.discount;

    case DiscountActions.DELETE_DISCOUNT:
      return {
        ...state,
        displayedDiscounts: state.displayedDiscounts.filter(discount => discount.id != action.data.id),
      };

    case DiscountActions.CREATE_DISCOUNT:
      return {
        ...state,
        displayedDiscounts: [action.data, ...state.displayedDiscounts],
      };

    case DiscountActions.SET_SELECTED_DISCOUNT:
      return {
        ...state,
        selectedDiscount: action.data,
      };

    case DiscountActions.UPDATE_DISCOUNT:
      const index = state.displayedDiscounts.findIndex(discount => discount.id === action.data.id);

      if (index > -1) {
        let displayedDiscounts = cloneDeep(state.displayedDiscounts);
        displayedDiscounts[index] = {
          ...state.displayedDiscounts[index],
          ...action.data,
        };

        return {
          ...state,
          displayedDiscounts,
        };
      }
      return state;

    case DiscountActions.SET_DISCOUNT_DISPLAY_FILTER:
      return {
        ...state,
        displayFilter: action.data,
      };

    case DiscountActions.UPDATE_DISCOUNT_TO_CREATE:
      return {
        ...state,
        discountToCreate: {
          ...state.discountToCreate,
          ...action.data,
        },
      };

    case DiscountActions.SET_DISCOUNT_TO_CREATE:
      return {
        ...state,
        discountToCreate: action.data,
      };

    default:
      return state;
  }
};

export default DiscountReducer;
