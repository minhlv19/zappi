import { DeliveryProfile, Product, ProductFilterInputParams } from 'App/Types';
import { cloneDeep } from 'lodash';
import { RootStateDefault } from '..';
import { IUpdateProductAction, ProductActions, IProductAction } from './ProductActions';

export interface ProductReduxState {
  products: Product[];
  displayedProducts: Product[];
  selectedProduct?: Product;
  displayFilter: ProductFilterInputParams;
  deliveryProfiles: DeliveryProfile[];
}

const ProductReducer = (state = RootStateDefault.product, action: IProductAction): ProductReduxState => {
  switch (action.type) {
    case ProductActions.SET_PRODUCTS_DATA:
      return {
        ...state,
        products: action.data as Product[],
      };

    case ProductActions.SET_DISPLAYED_PRODUCTS_DATA:
      return {
        ...state,
        displayedProducts: action.data as Product[],
      };

    case ProductActions.CLEAR_PRODUCT_DATA:
      return RootStateDefault.product;

    case ProductActions.DELETE_PRODUCT:
      return {
        ...state,
        displayedProducts: state.displayedProducts.filter(product => product.id != action.data.productId),
      };

    case ProductActions.SET_SELECTED_PRODUCT:
      return {
        ...state,
        selectedProduct: action.data,
      };

    case ProductActions.UPDATE_PRODUCT:
      const index = state.displayedProducts.findIndex(product => product.id === action.data.id);

      if (index > -1) {
        let displayedProducts = cloneDeep(state.displayedProducts);
        displayedProducts[index] = {
          ...state.displayedProducts[index],
          ...action.data,
        };

        return {
          ...state,
          displayedProducts,
        };
      }
      return state;

    case ProductActions.SET_PRODUCT_DISPLAY_FILTER:
      return {
        ...state,
        displayFilter: action.data,
      };

    case ProductActions.FETCH_DELIVERY_PROFILE:
      return {
        ...state,
        deliveryProfiles: action.data,
      };

    default:
      return state;
  }
};

export default ProductReducer;
