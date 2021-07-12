import { CategoryActions, ICategoryGeneralAction, IDeleteCategoryAction } from 'App/Redux/category/CategoryActions';
import {
  requestDeleteCategory,
  requestGetCategories,
  requestReorderCategory,
  requestSearchCategories,
  requestUpdateCategory,
} from 'App/Repositories/category';
import { ActionResponse, Category, CategoryFilterInputParams, Store } from 'App/Types';
import { put, takeEvery, all, select } from 'redux-saga/effects';
import * as Effects from 'redux-saga/effects';
import { RootState } from 'App/Redux';
import { logError } from 'App/Utils/error';

const call: any = Effects.call;

export const getStore = (state: RootState) => state.store;

function* fetchDisplayedCategoriesAsync(action: ICategoryGeneralAction<CategoryFilterInputParams>) {
  try {
    let store: Partial<Store> = yield select(getStore);
    const categories: Category[] = yield call(
      requestSearchCategories,
      store.id,
      action.data.searchText,
      action.data.filter,
    );
    console.log('categories', JSON.stringify(categories, null, 2));
    yield put({ type: CategoryActions.SET_DISPLAYED_CATEGORIES_DATA, data: categories });
  } catch (error) {
    logError(error);
  }
}

function* watchFetchDisplayedCategoriesAsync() {
  yield takeEvery(CategoryActions.SET_DISPLAYED_CATEGORIES_DATA_ASYNC, fetchDisplayedCategoriesAsync);
}

function* deleteCategoryAsync(action: IDeleteCategoryAction) {
  let store: Partial<Store> = yield select(getStore);
  const actionResponse: ActionResponse = yield call(requestDeleteCategory, store.id!, action.data.categoryId);
  yield put({ type: CategoryActions.DELETE_CATEGORY, data: action.data });
}

function* watchDeleteCategoryAsync() {
  yield takeEvery(CategoryActions.DELETE_CATEGORY_ASYNC, deleteCategoryAsync);
}

function* updateCategoryAsync(action: ICategoryGeneralAction<Partial<Category>>) {
  try {
    let store: Partial<Store> = yield select(getStore);
    const actionResponse: ActionResponse = yield call(requestUpdateCategory, store.id!, action.data.id, action.data);
    yield put({ type: CategoryActions.UPDATE_CATEGORY, data: action.data });
  } catch (error) {
    logError(error);
  }
}

function* watchUpdateCategoryAsync() {
  yield takeEvery(CategoryActions.UPDATE_CATEGORY_ASYNC, updateCategoryAsync);
}

function* reorderCategoryAsync(action: ICategoryGeneralAction<Partial<Category>[]>) {
  try {
    let store: Partial<Store> = yield select(getStore);
    const actionResponse: ActionResponse = yield call(requestReorderCategory, store.id!, action.data);
    yield put({ type: CategoryActions.REORDER_CATEGORY, data: action.data });
  } catch (error) {
    logError(error);
  }
}

function* watchReorderCategoryAsync() {
  yield takeEvery(CategoryActions.REORDER_CATEGORY_ASYNC, reorderCategoryAsync);
}

function* fetchCategoryInfoActionAsync() {
  try {
    let categories: Category[] = yield call(requestGetCategories);
    yield put({
      type: CategoryActions.SET_CATEGORIES_DATA,
      data: categories,
    });
  } catch (error) {
    logError(error);
  }
}

function* watchFetchCategoryInfoActionAsync() {
  yield takeEvery(CategoryActions.FETCH_CATEGORY_INFO_ASYNC, fetchCategoryInfoActionAsync);
}

function* categorySaga() {
  yield all([
    watchFetchDisplayedCategoriesAsync(),
    watchDeleteCategoryAsync(),
    watchUpdateCategoryAsync(),
    watchReorderCategoryAsync(),
    watchFetchCategoryInfoActionAsync(),
  ]);
}

export default categorySaga;
