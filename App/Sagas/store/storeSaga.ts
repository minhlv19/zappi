import { IUpdateStoreAction, StoreActions } from 'App/Redux/store/StoreActions';
import { requestGetStoreInfo } from 'App/Repositories/store';
import { Store } from 'App/Types';
import { call, put, takeEvery, all } from 'redux-saga/effects';

function* fetchStoreInfoAsync(action: IUpdateStoreAction) {
  // const store: Store = yield call(requestGetStoreInfo);
  // yield put({ type: StoreActions.UPDATE_STORE_DATA, data: store });
}

function* watchFetchStoreInfoAsync() {
  yield takeEvery(StoreActions.FETCH_STORE_INFO_ASYNC, fetchStoreInfoAsync);
}

function* storeSaga() {
  yield all([watchFetchStoreInfoAsync()]);
}

export default storeSaga;
