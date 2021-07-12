import { AppState, ConfirmModalData, ErrorModalData, SuccessModalData } from 'App/Types';
import { RootStateDefault } from '..';

export enum AppStateActions {
  SET_PRODUCT_BOTTOM_SHEET_SHOWING = 'SET_PRODUCT_BOTTOM_SHEET_SHOWING',
  TOGGLE_APP_STATE_FLAG = 'TOGGLE_APP_STATE_FLAG',
  UPDATE_ERROR_MODAL_DATA = 'UPDATE_ERROR_MODAL_DATA',
  UPDATE_CONFIRM_MODAL_DATA = 'UPDATE_CONFIRM_MODAL_DATA',
  UPDATE_SUCCESS_MODAL_DATA = 'UPDATE_SUCCESS_MODAL_DATA',
}

export interface IAppStateAction {
  type: AppStateActions;
  data: any;
}

export interface IAppStateItem<T> {
  key: string;
  value: T;
}

export interface IAppStateGeneralAction<T> {
  type: AppStateActions;
  data: T;
}

export const setProductBottomSheetShowingAction = (isShowing: boolean) => {
  return { type: AppStateActions.SET_PRODUCT_BOTTOM_SHEET_SHOWING, data: isShowing } as IAppStateAction;
};

export const toggleAppStateFlag = (key: string, value: boolean) => {
  return { type: AppStateActions.TOGGLE_APP_STATE_FLAG, data: { key, value } } as IAppStateGeneralAction<
    IAppStateItem<boolean>
  >;
};

export const updateErrorModalData = (modalData: Partial<ErrorModalData>) => {
  return { type: AppStateActions.UPDATE_ERROR_MODAL_DATA, data: modalData } as IAppStateGeneralAction<
    Partial<ErrorModalData>
  >;
};

export const updateConfirmModalData = (modalData: Partial<ConfirmModalData>) => {
  return { type: AppStateActions.UPDATE_CONFIRM_MODAL_DATA, data: modalData } as IAppStateGeneralAction<
    Partial<ConfirmModalData>
  >;
};

export const resetConfirmModalData = () => {
  return {
    type: AppStateActions.UPDATE_CONFIRM_MODAL_DATA,
    data: RootStateDefault.appState.confirmModalData,
  } as IAppStateGeneralAction<Partial<ConfirmModalData>>;
};

export const updateSuccessModalData = (modalData: Partial<SuccessModalData>) => {
  return { type: AppStateActions.UPDATE_SUCCESS_MODAL_DATA, data: modalData } as IAppStateGeneralAction<
    Partial<SuccessModalData>
  >;
};
