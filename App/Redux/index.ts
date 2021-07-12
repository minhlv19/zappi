import { AppState, ConfirmModalTypeEnums, Store } from 'App/Types';
import { DiscountType } from 'App/Types/discount';
import { combineReducers } from 'redux';
import AppStateReducer from './appState/AppStateReducer';
import CategoryReducer, { CategoryReduxState } from './category/CategoryReducer';
import DiscountReducer, { DiscountReduxState } from './discount/DiscountReducer';
import {
  defaultState as globalDefaultState,
  GlobalState,
  reducer as GlobalReducer,
  REDUX_KEY as GlobalKey,
} from './GlobalRedux';
import ProductReducer, { ProductReduxState } from './product/ProductReducer';
import StoreReducer from './store/StoreReducer';
import VariantReducer, { VariantReduxState } from './variant/VariantReducer';
import TransactionReducer, { TransactionReduxState } from './transaction/TransactionReducer';
import orderReducer, { OrderReduxState } from './order/orderReducer';

export interface RootState {
  [GlobalKey]: GlobalState;
  store: Partial<Store>;
  category: CategoryReduxState;
  appState: AppState;
  product: ProductReduxState;
  variant: VariantReduxState;
  discount: DiscountReduxState;
  transaction: TransactionReduxState;
  order: OrderReduxState;
}

export const RootStateDefault: RootState = {
  [GlobalKey]: globalDefaultState,
  store: {},
  category: {
    categories: [],
    displayedCategories: [],
    displayFilter: {},
  } as CategoryReduxState,
  appState: {
    showProductBottomSheet: false,
    isDraggingCategory: false,
    isDraggingProduct: false,
    errorModalData: {
      title: '',
      subtitle: '',
      dismissButtonTitle: '',
      display: false,
    },
    confirmModalData: {
      type: ConfirmModalTypeEnums.NONE,
      title: '',
      subtitle: '',
      confirmButtonTitle: '',
      cancelButtonTitle: '',
      display: false,
      state: undefined,
      metadata: undefined,
    },
    successModalData: {
      title: '',
      display: false,
    },
  } as AppState,
  product: {
    products: [],
    displayedProducts: [],
    displayFilter: {},
    deliveryProfiles: [],
  } as ProductReduxState,
  variant: {
    variantsCategories: [],
    variantsCategoriesDropDown: [],
    variantsSelections: [
      {
        selectionIndex: '-1',
        selectionValue: null,
      },
    ],
    variantsValueOptions: [],
    variantsChoice: [],
    variantsOption: [],
  } as VariantReduxState,
  discount: {
    discounts: [],
    displayedDiscounts: [],
    displayFilter: {
      type: DiscountType.MANUAL,
    },
    discountToCreate: {},
  } as DiscountReduxState,
  transaction: {
    createDiscount: {},
    updateDiscount: {},
  },
  order: {
    orders: [],
  },
};

export default combineReducers<RootState>({
  [GlobalKey]: GlobalReducer,
  store: StoreReducer,
  category: CategoryReducer,
  appState: AppStateReducer,
  product: ProductReducer,
  variant: VariantReducer,
  discount: DiscountReducer,
  transaction: TransactionReducer,
  order: orderReducer,
});
