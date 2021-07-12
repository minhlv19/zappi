import { AppState } from 'App/Types';
import { RootStateDefault } from '..';
import { AppStateActions, IAppStateAction } from './AppStateActions';

const AppStateReducer = (state = RootStateDefault.appState, action: IAppStateAction): AppState => {
  switch (action.type) {
    case AppStateActions.SET_PRODUCT_BOTTOM_SHEET_SHOWING:
      return {
        ...state,
        showProductBottomSheet: action.data,
      };

    case AppStateActions.TOGGLE_APP_STATE_FLAG:
      return {
        ...state,
        [action.data.key]: action.data.value,
      };

    case AppStateActions.UPDATE_ERROR_MODAL_DATA:
      return {
        ...state,
        errorModalData: {
          ...state.errorModalData,
          ...action.data,
        },
      };
    case AppStateActions.UPDATE_CONFIRM_MODAL_DATA:
      return {
        ...state,
        confirmModalData: {
          ...state.confirmModalData,
          ...action.data,
        },
      };

    case AppStateActions.UPDATE_SUCCESS_MODAL_DATA:
      return {
        ...state,
        successModalData: {
          ...state.successModalData,
          ...action.data,
        },
      };

    default:
      return state;
  }
};

export default AppStateReducer;
