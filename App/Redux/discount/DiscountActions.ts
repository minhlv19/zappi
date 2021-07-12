import { Discount, DiscountFilterInputParams, DiscountType } from 'App/Types/discount';

export enum DiscountActions {
  FETCH_DISCOUNT_INFO_ASYNC = 'FETCH_DISCOUNT_INFO_ASYNC',
  SET_DISCOUNTS_DATA = 'SET_DISCOUNTS_DATA',
  CLEAR_DISCOUNT_DATA = 'CLEAR_DISCOUNT_DATA',
  SET_DISPLAYED_DISCOUNTS_DATA = 'SET_DISPLAYED_DISCOUNTS_DATA',
  SET_DISPLAYED_DISCOUNTS_DATA_ASYNC = 'SET_DISPLAYED_DISCOUNTS_DATA_ASYNC',
  DELETE_DISCOUNT = 'DELETE_DISCOUNT',
  DELETE_DISCOUNT_ASYNC = 'DELETE_DISCOUNT_ASYNC',
  SET_SELECTED_DISCOUNT = 'SET_SELECTED_DISCOUNT',
  UPDATE_DISCOUNT = 'UPDATE_DISCOUNT',
  UPDATE_DISCOUNT_ASYNC = 'UPDATE_DISCOUNT_ASYNC',
  SET_DISCOUNT_DISPLAY_FILTER = 'SET_DISCOUNT_DISPLAY_FILTER',
  SET_DISCOUNTS_DATA_ASYNC = 'SET_DISCOUNTS_DATA_ASYNC',
  REORDER_DISCOUNT_ASYNC = 'REORDER_DISCOUNT_ASYNC',
  REORDER_DISCOUNT = 'REORDER_DISCOUNT',
  UPDATE_DISCOUNT_TO_CREATE = 'UPDATE_DISCOUNT_TO_CREATE',
  CREATE_DISCOUNT = 'CREATE_DISCOUNT',
  CREATE_DISCOUNT_ASYNC = 'CREATE_DISCOUNT_ASYNC',
  SET_DISCOUNT_TO_CREATE = 'SET_DISCOUNT_TO_CREATE',
}

export interface IDiscountGeneralAction<T> {
  type: DiscountActions;
  data: T;
}

export const setDiscountDataAsyncAction = () => {
  return { type: DiscountActions.SET_DISCOUNTS_DATA_ASYNC } as IDiscountGeneralAction<void>;
};

export const setDisplayedDiscountDataAction = (discounts: Discount[]) => {
  return { type: DiscountActions.SET_DISPLAYED_DISCOUNTS_DATA, data: discounts } as IDiscountGeneralAction<Discount[]>;
};

export const fetchDiscountInfoActionAsync = () => {
  return { type: DiscountActions.FETCH_DISCOUNT_INFO_ASYNC } as IDiscountGeneralAction<void>;
};

export const clearDiscountDataAction = () => {
  return { type: DiscountActions.CLEAR_DISCOUNT_DATA } as IDiscountGeneralAction<void>;
};

export const searchDiscountsAsyncAction = (type: DiscountType, searchText: string) => {
  return {
    type: DiscountActions.SET_DISPLAYED_DISCOUNTS_DATA_ASYNC,
    data: { type, searchText },
  } as IDiscountGeneralAction<DiscountFilterInputParams>;
};

export const deleteDiscountAsyncAction = (discountId: string) => {
  return { type: DiscountActions.DELETE_DISCOUNT_ASYNC, data: { id: discountId } } as IDiscountGeneralAction<
    Partial<Discount>
  >;
};

export const setSelectedDiscountAction = (discount: Discount) => {
  return { type: DiscountActions.SET_SELECTED_DISCOUNT, data: discount } as IDiscountGeneralAction<Discount>;
};

export const updateDiscountAsyncAction = (updatedDiscount: Partial<Discount>) => {
  return { type: DiscountActions.UPDATE_DISCOUNT_ASYNC, data: updatedDiscount } as IDiscountGeneralAction<
    Partial<Discount>
  >;
};

export const reorderDiscountAsyncAction = (updatedDiscounts: Partial<Discount>[]) => {
  return { type: DiscountActions.REORDER_DISCOUNT_ASYNC, data: updatedDiscounts } as IDiscountGeneralAction<
    Partial<Discount>[]
  >;
};

export const setDiscountDisplayFilterAction = (type: DiscountType, searchText: string) => {
  return {
    type: DiscountActions.SET_DISCOUNT_DISPLAY_FILTER,
    data: { type, searchText },
  } as IDiscountGeneralAction<DiscountFilterInputParams>;
};

export const updateDiscountToCreateAction = (updatedDiscount: Partial<Discount>) => {
  return { type: DiscountActions.UPDATE_DISCOUNT_TO_CREATE, data: updatedDiscount } as IDiscountGeneralAction<
    Partial<Discount>
  >;
};

export const resetDiscountToCreateAction = () => {
  return { type: DiscountActions.SET_DISCOUNT_TO_CREATE, data: {} } as IDiscountGeneralAction<Partial<Discount>>;
};

export const createDiscountAsyncAction = (discount: Partial<Discount>) => {
  return { type: DiscountActions.CREATE_DISCOUNT_ASYNC, data: discount } as IDiscountGeneralAction<Partial<Discount>>;
};
