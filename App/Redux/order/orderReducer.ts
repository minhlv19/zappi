import { IOrder } from 'App/Types/order';
import { RootStateDefault } from '..';
import { IOrderGeneralAction, OrderAction } from './orderActions';

export interface OrderReduxState {
  orders: IOrder[];
}

const orderReducer = (state = RootStateDefault.order, action: IOrderGeneralAction<any>): OrderReduxState => {
  switch (action.type) {
    case OrderAction.FETCH_ORDER:
      return {
        ...state,
        orders: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};
export default orderReducer;
