import { Store } from 'App/Types';

export enum StoreActions {
  FETCH_STORE_INFO_ASYNC = 'FETCH_STORE_INFO_ASYNC',
  UPDATE_STORE_DATA = 'UPDATE_STORE_DATA',
  GET_STORE_DATA = 'GET_STORE_DATA',
  CLEAR_STORE_DATA = 'CLEAR_STORE_DATA',
}

export interface IUpdateStoreAction {
  type: StoreActions;
  data: Partial<Store>;
}

export interface IRequestGetStoreInfoAction {
  type: StoreActions;
}

export interface IClearStoreDataAction {
  type: StoreActions;
}

export const updateStoreDataAction = (store: Partial<Store>) => {
  return { type: StoreActions.UPDATE_STORE_DATA, data: store } as IUpdateStoreAction;
};

export const fetchStoreInfoActionAsync = () => {
  return { type: StoreActions.FETCH_STORE_INFO_ASYNC } as IRequestGetStoreInfoAction;
};

export const clearStoreDataAction = () => {
  return { type: StoreActions.CLEAR_STORE_DATA } as IClearStoreDataAction;
};
