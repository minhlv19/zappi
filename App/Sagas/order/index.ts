import { IOrderGeneralAction, OrderAction } from 'App/Redux/order/orderActions';
import { requestFetchOrder, requestSearchOrder } from 'App/Repositories/order';
import { EStatusOrder, IOrder } from 'App/Types/order';
import { call, put, takeEvery, all } from 'redux-saga/effects';

function* fetchOrder(action: IOrderGeneralAction<IOrder[]>) {
  const orderList: IOrder[] = yield call(requestFetchOrder);
  yield put({ type: OrderAction.FETCH_ORDER, data: orderList });
}

function* watchFetchOrder() {
  yield takeEvery(OrderAction.FETCH_ORDER_ASYNC, fetchOrder);
}

function* searchOrder(
  action: IOrderGeneralAction<{
    searchText: string;
    type: EStatusOrder;
  }>,
) {
  const orderList: IOrder[] = yield call(requestSearchOrder, action.data.searchText, action.data.type);
  yield put({ type: OrderAction.FETCH_ORDER, data: orderList });
}

function* watchSearchOrder() {
  yield takeEvery(OrderAction.SEARCH_ORDER_ASYNC, searchOrder);
}
function* orderSaga() {
  yield all([watchFetchOrder(), watchSearchOrder()]);
}

export default orderSaga;
