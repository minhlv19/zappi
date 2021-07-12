import { put, takeEvery, all, takeLatest, select } from 'redux-saga/effects';
import * as Effects from 'redux-saga/effects';
import {
  IOnChangeVariantChoice,
  IOnChangeVariantValueOptions,
  ISetSelectVariantCategories,
  IVariantGeneralAction,
  VariantAction,
} from 'App/Redux/variant/VariantAction';
import { ActionResponse, Store, Variant, VariantOption } from 'App/Types';
import { requestGetVariantCategories } from 'App/Repositories/variant';
import { logError } from 'App/Utils/error';
import { RootState } from 'App/Redux';
import { IVariantOption, VariantReduxState, IVariantsValueOptions } from 'App/Redux/variant/VariantReducer';
import _ from 'lodash';
import { getStore } from '../product/productSaga';
import { StyleDropdownRowData } from 'App/Components/StyledDropdownSelect/StyledDropdownSelect';

const call: any = Effects.call;

function* fetchVariantCategoryAsync(action: IVariantGeneralAction<any>) {
  try {
    let { variantsSelections, variantsValueOptions, variantsOption }: VariantReduxState = yield select(
      (state: RootState) => state.variant,
    );
    let { productSetType }: Partial<Store> = yield select(getStore);
    const isFnB = productSetType === 'F&B';

    const variantCategories: Variant[] = yield call(requestGetVariantCategories);

    let variantsCategoriesDropDown = variantCategories.map((v: Variant) => ({
      title: v.name,
      value: {
        id: v.id,
        options: v.options,
      },
    }));
    let idChange = action.data.idChange;
    let indexVC = action.data.indexVC;
    // Get variant
    let tmpSelections = [...variantsSelections];

    let tmpVariantsValueOptions = [...variantsValueOptions];
    let tmpVariantsOption = [...variantsOption];
    if (idChange) {
      //selections
      let tmpSelections = [...variantsSelections];
      let newCategorySelection = variantsCategoriesDropDown.filter(
        (v: StyleDropdownRowData) => v.value.id === idChange,
      );
      if (_.isNumber(indexVC)) {
        tmpSelections[indexVC].selectionValue = newCategorySelection[0];

        tmpVariantsValueOptions[indexVC] = tmpSelections[indexVC].selectionValue?.value.options.map(
          (v: VariantOption) => {
            let prevValueOption = _.find(tmpVariantsValueOptions[indexVC], _.matchesProperty('title', v.name));
            if (prevValueOption) return prevValueOption;
            return {
              title: v.name,
              isAvailable: v.available || false,
              price: [''],
              numberInStock: [''],
            };
          },
        );
      }
      if (!isFnB) {
        let indexChange = _.findIndex(tmpSelections, function (o) {
          return o.selectionValue?.value.id === idChange;
        });
        tmpVariantsOption[indexChange] = tmpSelections[indexVC].selectionValue?.value.options.map(
          (v: VariantOption) => {
            let prevValueOption = _.find(tmpVariantsValueOptions[indexVC], _.matchesProperty('title', v.name));
            if (prevValueOption) return prevValueOption;
            return {
              title: v.name,
              isFocus: false,
            };
          },
        );
        while (tmpVariantsOption[indexChange].length % 3 !== 0) {
          tmpVariantsOption[indexChange].splice(tmpVariantsOption[indexChange].length, 0, {
            title: '',
            isNull: true,
          });
        }
      }
    }
    yield put({
      type: VariantAction.FETCH_VARIANT_CATEGORIES,
      data: {
        variantCategories,
        variantsCategoriesDropDown,
        variantsSelections: tmpSelections,
        variantsValueOptions: tmpVariantsValueOptions,
        variantsOption: tmpVariantsOption,
      },
    });
  } catch (e) {
    logError(e);
  }
}

function* watchFetchVariantCategoryAsync() {
  yield takeEvery(VariantAction.FETCH_VARIANT_CATEGORIES_ASYNC, fetchVariantCategoryAsync);
}

function* setSelectVariantCategories(action: IVariantGeneralAction<ISetSelectVariantCategories>) {
  let { variantsSelections, variantsValueOptions, variantsOption }: VariantReduxState = yield select(
    (state: RootState) => state.variant,
  );

  let tmpVariantsSelections = [...variantsSelections]; //Both
  let tmpVariantsValueOptions = [...variantsValueOptions]; //In fb
  let tmpVariantsOption = [...variantsOption]; //in non f&b

  tmpVariantsSelections[action?.data?.index] = {
    selectionIndex: action?.data.selectionIndex,
    selectionValue: action?.data.selectionValue,
  };
  if (action?.data.isSetValueOption) {
    if (tmpVariantsSelections[action?.data?.index]?.selectionValue) {
      let tmpLst: VariantOption[] = tmpVariantsSelections[action?.data?.index]?.selectionValue?.value?.options;
      tmpVariantsValueOptions[action?.data?.index] = [];
      for (let i = 0; i < tmpVariantsSelections[action?.data?.index]?.selectionValue?.value?.options.length; i++) {
        let tmpData: IVariantsValueOptions = {
          title: tmpLst[i].name,
          isAvailable: tmpLst[i].available || false,
          price: [''],
          numberInStock: [''],
        };
        tmpVariantsValueOptions[action?.data?.index][i] = tmpData;
      }
    }
  } else {
    if (tmpVariantsSelections[action?.data?.index]?.selectionValue) {
      let tmpLst: VariantOption[] = tmpVariantsSelections[action?.data?.index]?.selectionValue?.value?.options;
      tmpVariantsOption[action?.data?.index] = [];
      for (let i = 0; i < tmpVariantsSelections[action?.data?.index]?.selectionValue?.value?.options.length; i++) {
        let tmpData: IVariantOption = {
          title: tmpLst[i].name,
          isFocus: false,
        };
        tmpVariantsOption[action?.data?.index][i] = tmpData;
      }
      while (tmpVariantsOption[action?.data?.index].length % 3 !== 0) {
        tmpVariantsOption[action?.data?.index].push({
          title: '',
          isNull: true,
        });
      }
      tmpVariantsValueOptions[action?.data?.index] = [];
    }
  }
  yield put({
    type: VariantAction.SET_SELECT_VARIANT_CATEGORIES,
    data: {
      variantsSelections: tmpVariantsSelections,
      variantsValueOptions: tmpVariantsValueOptions,
      variantsOption: tmpVariantsOption,
    },
  });
}

function* watchSetSelectVariantCategories() {
  yield takeEvery(VariantAction.SET_SELECT_VARIANT_CATEGORIES_ASYNC, setSelectVariantCategories);
}

function* onChangeVariantValueOptions(action: IVariantGeneralAction<IOnChangeVariantValueOptions>) {
  let { variantsValueOptions }: VariantReduxState = yield select((state: RootState) => state.variant);
  let tmpVariantsValueOptions = [...variantsValueOptions];
  if (action.data?.action === 'PRICE' && _.isString(action.data?.value)) {
    tmpVariantsValueOptions[action.data?.indexVariantCategory][action.data?.indexItem].price[
      action.data?.orderOfData || 0
    ] = action.data?.value;
  }
  if (action.data?.action === 'AVAILABLE' && _.isBoolean(action.data?.value)) {
    tmpVariantsValueOptions[action.data?.indexVariantCategory][action.data?.indexItem].isAvailable = action.data?.value;
  }
  if (action.data?.action === 'STOCK' && _.isString(action.data?.value)) {
    tmpVariantsValueOptions[action.data?.indexVariantCategory][action.data?.indexItem].numberInStock[
      action.data?.orderOfData || 0
    ] = action.data?.value;
  }

  yield put({ type: VariantAction.ON_CHANGE_VARIANT_VALUE_OPTIONS, data: tmpVariantsValueOptions });
}

function* watchOnChangeVariantValueOptions() {
  yield takeEvery(VariantAction.ON_CHANGE_VARIANT_VALUE_OPTIONS_ASYNC, onChangeVariantValueOptions);
}

function* onChangeVariantChoice(action: IVariantGeneralAction<IOnChangeVariantChoice>) {
  let { variantsChoice }: VariantReduxState = yield select((state: RootState) => state.variant);

  let tmpVariantsChoice = [...variantsChoice];
  tmpVariantsChoice[action.data?.indexVariantCategory] = {
    min:
      action.data?.action === 'MIN' && action.data?.value
        ? action.data?.value
        : tmpVariantsChoice[action.data?.indexVariantCategory]?.min || '',
    max:
      action.data?.action === 'MAX' && action.data?.value
        ? action.data?.value
        : tmpVariantsChoice[action.data?.indexVariantCategory]?.max || '',
  };

  yield put({ type: VariantAction.ON_CHANGE_VARIANT_CHOICE, data: tmpVariantsChoice });
}

function* watchOnChangeVariantChoice() {
  yield takeEvery(VariantAction.ON_CHANGE_VARIANT_CHOICE_ASYNC, onChangeVariantChoice);
}

function* addVariant() {
  let { variantsSelections }: VariantReduxState = yield select((state: RootState) => state.variant);
  let { productSetType }: Partial<Store> = yield select(getStore);
  const isFnB = productSetType === 'F&B';
  yield put({
    type: VariantAction.ADD_VARIANT,
    data:
      (!isFnB && variantsSelections.length < 2) || isFnB
        ? [
            ...variantsSelections,
            {
              selectionIndex: '-1',
              selectionValue: null,
            },
          ]
        : variantsSelections,
  });
}

function* watchAddVariant() {
  yield takeEvery(VariantAction.ADD_VARIANT_ASYNC, addVariant);
}

function* forceSetVariant(action: IVariantGeneralAction<any[]>) {
  yield put({
    type: VariantAction.FORCE_SET_VARIANT,
    data: action.data,
  });
}

function* watchForceSetVariant() {
  yield takeEvery(VariantAction.FORCE_SET_VARIANT_ASYNC, forceSetVariant);
}

function* deleteVariant(action: IVariantGeneralAction<any>) {
  let { variantsSelections, variantsValueOptions, variantsChoice, variantsOption }: VariantReduxState = yield select(
    (state: RootState) => state.variant,
  );
  let index: number = action.data;

  yield put({
    type: VariantAction.FORCE_SET_VARIANT,
    data: [
      variantsSelections.filter((v: any, i: number) => i !== index),
      variantsValueOptions.filter((v: any, i: number) => i !== index),
      variantsChoice.filter((v: any, i: number) => i !== index),
      variantsOption.filter((v: any, i: number) => i !== index),
    ],
  });
}

function* watchDeleteVariant() {
  yield takeEvery(VariantAction.DELETE_VARIANT_ASYNC, deleteVariant);
}

function* onClickVariantOption(action: IVariantGeneralAction<{ indexVariantCategory: number; indexItem: number }>) {
  let { variantsOption, variantsValueOptions }: VariantReduxState = yield select((state: RootState) => state.variant);
  let tmpVariantsOption = [...variantsOption];
  // Change status button
  let current = tmpVariantsOption[action.data.indexVariantCategory][action.data.indexItem];
  tmpVariantsOption[action.data.indexVariantCategory][action.data.indexItem].isFocus = !current.isFocus;
  // Add to variantsValueOptions
  let tmpVariantsValueOptions = [...variantsValueOptions];
  if (!tmpVariantsValueOptions[action.data.indexVariantCategory]) {
    tmpVariantsValueOptions[action.data.indexVariantCategory] = [];
  }

  //currentStatus true so we need to pop it
  if (!current.isFocus) {
    tmpVariantsValueOptions[action.data.indexVariantCategory] = tmpVariantsValueOptions[
      action.data.indexVariantCategory
    ].filter((v: IVariantsValueOptions) => v.title !== current.title);
  } else {
    tmpVariantsValueOptions[action.data.indexVariantCategory].push({
      title: tmpVariantsOption[action.data.indexVariantCategory][action.data.indexItem].title,
      numberInStock: [''],
      isAvailable: true,
      price: [''],
    });
  }

  yield put({
    type: VariantAction.ON_CLICK_VARIANT_OPTION,
    data: {
      variantsOption: tmpVariantsOption,
      variantsValueOptions: tmpVariantsValueOptions,
    },
  });
}

function* watchOnClickVariantOption() {
  yield takeEvery(VariantAction.ON_CLICK_VARIANT_OPTION_ASYNC, onClickVariantOption);
}

function* variantSaga() {
  yield all([
    watchFetchVariantCategoryAsync(),
    watchSetSelectVariantCategories(),
    watchOnChangeVariantValueOptions(),
    watchOnChangeVariantChoice(),
    watchAddVariant(),
    watchForceSetVariant(),
    watchDeleteVariant(),
    watchOnClickVariantOption(),
  ]);
}

export default variantSaga;
