import { DiscountActions, IDiscountGeneralAction } from 'App/Redux/discount/DiscountActions';
import {
  requestCreateDiscount,
  requestDeleteDiscount,
  requestGetDiscounts,
  requestReorderDiscount,
  requestSearchDiscounts,
  requestUpdateDiscount,
} from 'App/Repositories/discount';
import { ActionResponse, Store } from 'App/Types';
import { put, takeEvery, all, select } from 'redux-saga/effects';
import * as Effects from 'redux-saga/effects';
import { RootState } from 'App/Redux';
import { logError } from 'App/Utils/error';
import { TransactionActions } from 'App/Redux/transaction/TransactionActions';
import { Discount, DiscountFilterInputParams } from 'App/Types/discount';

const call: any = Effects.call;

export const getStore = (state: RootState) => state.store;

function* fetchDisplayedDiscountsAsync(action: IDiscountGeneralAction<DiscountFilterInputParams>) {
  try {
    let store: Partial<Store> = yield select(getStore);
    const discounts: Discount[] = yield call(
      requestSearchDiscounts,
      store.id,
      action.data.type,
      action.data.searchText,
    );
    yield put({ type: DiscountActions.SET_DISPLAYED_DISCOUNTS_DATA, data: discounts });
  } catch (error) {
    logError(error);
  }
}

function* watchFetchDisplayedDiscountsAsync() {
  yield takeEvery(DiscountActions.SET_DISPLAYED_DISCOUNTS_DATA_ASYNC, fetchDisplayedDiscountsAsync);
}

function* fetchDiscountsAsync(action: IDiscountGeneralAction<void>) {
  let store: Partial<Store> = yield select(getStore);
  const discounts: Discount[] = yield call(requestGetDiscounts, store.id);
  yield put({ type: DiscountActions.SET_DISCOUNTS_DATA, data: discounts });
}

function* watchFetchDiscountsAsync() {
  yield takeEvery(DiscountActions.SET_DISCOUNTS_DATA_ASYNC, fetchDiscountsAsync);
}

function* deleteDiscountAsync(action: IDiscountGeneralAction<Partial<Discount>>) {
  let store: Partial<Store> = yield select(getStore);
  const actionResponse: ActionResponse = yield call(requestDeleteDiscount, store.id!, action.data.id);
  yield put({ type: DiscountActions.DELETE_DISCOUNT, data: action.data });
}

function* watchDeleteDiscountAsync() {
  yield takeEvery(DiscountActions.DELETE_DISCOUNT_ASYNC, deleteDiscountAsync);
}

function* updateDiscountAsync(action: IDiscountGeneralAction<Partial<Discount>>) {
  try {
    let store: Partial<Store> = yield select(getStore);
    yield call(requestUpdateDiscount, store.id!, action.data.id, action.data);
    yield put({ type: DiscountActions.UPDATE_DISCOUNT, data: action.data });
    yield put({
      type: TransactionActions.UPDATE_TRANSACTION,
      data: { name: 'updateDiscount', data: { response: true, errorResponse: undefined } },
    });
  } catch (error) {
    yield put({
      type: TransactionActions.UPDATE_TRANSACTION,
      data: { name: 'updateDiscount', data: { errorResponse: error.response.data, response: undefined } },
    });
    logError(error);
  }
}

function* watchUpdateDiscountAsync() {
  yield takeEvery(DiscountActions.UPDATE_DISCOUNT_ASYNC, updateDiscountAsync);
}

function* reorderDiscountAsync(action: IDiscountGeneralAction<Partial<Discount>[]>) {
  try {
    let store: Partial<Store> = yield select(getStore);
    const actionResponse: ActionResponse = yield call(requestReorderDiscount, store.id!, action.data);
    yield put({ type: DiscountActions.REORDER_DISCOUNT, data: action.data });
  } catch (error) {
    logError(error);
  }
}

function* watchReorderDiscountAsync() {
  yield takeEvery(DiscountActions.REORDER_DISCOUNT_ASYNC, reorderDiscountAsync);
}

function* createDiscountAsync(action: IDiscountGeneralAction<Partial<Discount>>) {
  try {
    let store: Partial<Store> = yield select(getStore);
    const createdDiscount: Discount = yield call(requestCreateDiscount, action.data);
    yield put({ type: DiscountActions.CREATE_DISCOUNT, data: createdDiscount });
    yield put({
      type: TransactionActions.UPDATE_TRANSACTION,
      data: { name: 'createDiscount', data: { response: createdDiscount, errorResponse: undefined } },
    });
  } catch (error) {
    yield put({
      type: TransactionActions.UPDATE_TRANSACTION,
      data: { name: 'createDiscount', data: { errorResponse: error.response.data, response: undefined } },
    });
    logError(error);
  }
}

function* watchCreateDiscountAsync() {
  yield takeEvery(DiscountActions.CREATE_DISCOUNT_ASYNC, createDiscountAsync);
}

function* discountSaga() {
  yield all([
    watchFetchDisplayedDiscountsAsync(),
    watchDeleteDiscountAsync(),
    watchUpdateDiscountAsync(),
    watchFetchDiscountsAsync(),
    watchReorderDiscountAsync(),
    watchCreateDiscountAsync(),
  ]);
}

export default discountSaga;
