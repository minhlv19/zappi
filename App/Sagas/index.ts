import { all } from 'redux-saga/effects';
import storeSaga from './store/storeSaga';
import categorySaga from './category/categorySaga';
import productSaga from './product/productSaga';
import discountSaga from './discount/discountSaga';
import orderSaga from './order';
import variantSoga from './variant/variantSaga';
function* rootSaga() {
  yield all([storeSaga(), categorySaga(), productSaga(), discountSaga(), orderSaga(), variantSoga()]);
}

export default rootSaga;
