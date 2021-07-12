import { Product, ProductFilterEnums, ProductFilterInputParams, ProductOrderByEnums } from 'App/Types';

export enum ProductActions {
  FETCH_PRODUCT_INFO_ASYNC = 'FETCH_PRODUCT_INFO_ASYNC',
  SET_PRODUCTS_DATA = 'SET_PRODUCTS_DATA',
  CLEAR_PRODUCT_DATA = 'CLEAR_PRODUCT_DATA',
  SET_DISPLAYED_PRODUCTS_DATA = 'SET_DISPLAYED_PRODUCTS_DATA',
  SET_DISPLAYED_PRODUCTS_DATA_ASYNC = 'SET_DISPLAYED_PRODUCTS_DATA_ASYNC',
  DELETE_PRODUCT = 'DELETE_PRODUCT',
  DELETE_PRODUCT_ASYNC = 'DELETE_PRODUCT_ASYNC',
  SET_SELECTED_PRODUCT = 'SET_SELECTED_PRODUCT',
  UPDATE_PRODUCT = 'UPDATE_PRODUCT',
  UPDATE_PRODUCT_ASYNC = 'UPDATE_PRODUCT_ASYNC',
  SET_PRODUCT_DISPLAY_FILTER = 'SET_PRODUCT_DISPLAY_FILTER',
  SET_PRODUCTS_DATA_ASYNC = 'SET_PRODUCTS_DATA_ASYNC',
  REORDER_PRODUCT_ASYNC = 'REORDER_PRODUCT_ASYNC',
  REORDER_PRODUCT = 'REORDER_PRODUCT',

  FETCH_DELIVERY_PROFILE_ASYNC = 'FETCH_DELIVERY_PROFILE_ASYNC',
  FETCH_DELIVERY_PROFILE = 'FETCH_DELIVERY_PROFILE',
}

export interface IUpdateProductAction {
  type: ProductActions;
  data: Partial<Product>;
}

export interface IRequestGetProductInfoAction {
  type: ProductActions;
}

export interface IClearProductDataAction {
  type: ProductActions;
}

export interface IProductAction {
  type: ProductActions;
  data: any;
}

export interface ISearchProductsAction {
  type: ProductActions;
  data: {
    storeId: string;
    filter: ProductFilterInputParams;
  };
}

export interface IDeleteProductAction {
  type: ProductActions;
  data: {
    productId: string;
  };
}

export interface IProductGeneralAction<T> {
  type: ProductActions;
  data: T;
}

export const setProductDataAsyncAction = () => {
  return { type: ProductActions.SET_PRODUCTS_DATA_ASYNC } as IProductGeneralAction<void>;
};

export const setDisplayedProductDataAction = (products: Product[]) => {
  return { type: ProductActions.SET_DISPLAYED_PRODUCTS_DATA, data: products } as IProductAction;
};

export const fetchProductInfoActionAsync = () => {
  return { type: ProductActions.FETCH_PRODUCT_INFO_ASYNC } as IRequestGetProductInfoAction;
};

export const clearProductDataAction = () => {
  return { type: ProductActions.CLEAR_PRODUCT_DATA } as IClearProductDataAction;
};

export const searchProductsAsyncAction = (
  searchText: string,
  filter: ProductFilterEnums,
  orderBy: ProductOrderByEnums,
  categoryId: string,
) => {
  return {
    type: ProductActions.SET_DISPLAYED_PRODUCTS_DATA_ASYNC,
    data: { searchText, filter, orderBy, categoryId },
  } as IProductGeneralAction<ProductFilterInputParams>;
};

export const deleteProductAsyncAction = (productId: string) => {
  return { type: ProductActions.DELETE_PRODUCT_ASYNC, data: { productId } } as IDeleteProductAction;
};

export const setSelectedProductAction = (product: Product) => {
  return { type: ProductActions.SET_SELECTED_PRODUCT, data: product } as IProductGeneralAction<Product>;
};

export const updateProductAsyncAction = (updatedProduct: Partial<Product>) => {
  return { type: ProductActions.UPDATE_PRODUCT_ASYNC, data: updatedProduct } as IProductGeneralAction<Partial<Product>>;
};

export const reorderProductAsyncAction = (updatedProducts: Partial<Product>[]) => {
  return { type: ProductActions.REORDER_PRODUCT_ASYNC, data: updatedProducts } as IProductGeneralAction<
    Partial<Product>[]
  >;
};

export const setProductDisplayFilterAction = (
  searchText: string,
  filter: ProductFilterEnums,
  orderBy: ProductOrderByEnums,
  categoryId: string,
) => {
  return {
    type: ProductActions.SET_PRODUCT_DISPLAY_FILTER,
    data: { searchText, filter, orderBy, categoryId },
  } as IProductGeneralAction<ProductFilterInputParams>;
};

export interface IFetchDeliveryProfileAsync {
  type: ProductActions;
}

export const fetchDeliveryProfile = () => {
  return {
    type: ProductActions.FETCH_DELIVERY_PROFILE_ASYNC,
  } as IFetchDeliveryProfileAsync;
};
