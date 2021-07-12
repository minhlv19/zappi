import { ProductActions, IProductGeneralAction, IDeleteProductAction } from 'App/Redux/product/ProductActions';
import {
  requestDeleteProduct,
  requestGetDeliveryProfiles,
  requestGetProducts,
  requestReorderProduct,
  requestSearchProducts,
  requestUpdateProduct,
} from 'App/Repositories/product';
import { ActionResponse, DeliveryProfile, Product, ProductFilterInputParams, Store } from 'App/Types';
import { put, takeEvery, all, select } from 'redux-saga/effects';
import * as Effects from 'redux-saga/effects';
import { RootState } from 'App/Redux';
import { logError } from 'App/Utils/error';

const call: any = Effects.call;

export const getStore = (state: RootState) => state.store;

function* fetchDisplayedProductsAsync(action: IProductGeneralAction<ProductFilterInputParams>) {
  try {
    let store: Partial<Store> = yield select(getStore);
    const products: Product[] = yield call(
      requestSearchProducts,
      store.id,
      action.data.searchText,
      action.data.orderBy,
      action.data.filter,
      action.data.categoryId,
    );
    yield put({ type: ProductActions.SET_DISPLAYED_PRODUCTS_DATA, data: products });
  } catch (error) {
    logError(error);
  }
}

function* watchFetchDisplayedProductsAsync() {
  yield takeEvery(ProductActions.SET_DISPLAYED_PRODUCTS_DATA_ASYNC, fetchDisplayedProductsAsync);
}

function* fetchProductsAsync(action: IProductGeneralAction<void>) {
  let store: Partial<Store> = yield select(getStore);
  const products: Product[] = yield call(requestGetProducts, store.id);
  yield put({ type: ProductActions.SET_PRODUCTS_DATA, data: products });
}

function* watchFetchProductsAsync() {
  yield takeEvery(ProductActions.SET_PRODUCTS_DATA_ASYNC, fetchProductsAsync);
}

function* deleteProductAsync(action: IDeleteProductAction) {
  let store: Partial<Store> = yield select(getStore);
  const actionResponse: ActionResponse = yield call(requestDeleteProduct, store.id!, action.data.productId);
  yield put({ type: ProductActions.DELETE_PRODUCT, data: action.data });
}

function* watchDeleteProductAsync() {
  yield takeEvery(ProductActions.DELETE_PRODUCT_ASYNC, deleteProductAsync);
}

function* updateProductAsync(action: IProductGeneralAction<Partial<Product>>) {
  let store: Partial<Store> = yield select(getStore);
  const actionResponse: ActionResponse = yield call(requestUpdateProduct, store.id!, action.data.id, action.data);
  yield put({ type: ProductActions.UPDATE_PRODUCT, data: action.data });
}

function* watchUpdateProductAsync() {
  yield takeEvery(ProductActions.UPDATE_PRODUCT_ASYNC, updateProductAsync);
}

function* reorderProductAsync(action: IProductGeneralAction<Partial<Product>[]>) {
  try {
    let store: Partial<Store> = yield select(getStore);
    const actionResponse: ActionResponse = yield call(requestReorderProduct, store.id!, action.data);
    yield put({ type: ProductActions.REORDER_PRODUCT, data: action.data });
  } catch (error) {
    logError(error);
  }
}

function* watchReorderProductAsync() {
  yield takeEvery(ProductActions.REORDER_PRODUCT_ASYNC, reorderProductAsync);
}

function* fetchDeliveryProfile() {
  try {
    const deliveryProfile: DeliveryProfile[] = yield call(requestGetDeliveryProfiles);
    yield put({ type: ProductActions.FETCH_DELIVERY_PROFILE, data: deliveryProfile });
  } catch (err) {
    logError(err);
  }
}

function* watchFetchDeliveryProfileAsync() {
  yield takeEvery(ProductActions.FETCH_DELIVERY_PROFILE_ASYNC, fetchDeliveryProfile);
}

function* productSaga() {
  yield all([
    watchFetchDisplayedProductsAsync(),
    watchDeleteProductAsync(),
    watchUpdateProductAsync(),
    watchFetchProductsAsync(),
    watchReorderProductAsync(),
    watchFetchDeliveryProfileAsync(),
  ]);
}

export default productSaga;
