import { EStatusOrder } from 'App/Types/order';

export enum OrderAction {
  FETCH_ORDER_ASYNC = 'FETCH_ORDER_ASYNC',
  FETCH_ORDER = 'FETCH_ORDER',

  SEARCH_ORDER_ASYNC = 'SEARCH_ORDER_ASYNC',
}

export interface IOrderGeneralAction<T> {
  type: OrderAction;
  data: T;
}

export const fetchOrderList = (type: string = 'All') => {
  return {
    type: OrderAction.FETCH_ORDER_ASYNC,
    data: {
      type,
    },
  } as IOrderGeneralAction<{ type: string }>;
};

export const searchOrder = (searchText: string, type: EStatusOrder) => {
  return {
    type: OrderAction.SEARCH_ORDER_ASYNC,
    data: {
      searchText,
      type,
    },
  } as IOrderGeneralAction<{
    searchText: string;
    type: EStatusOrder;
  }>;
};
