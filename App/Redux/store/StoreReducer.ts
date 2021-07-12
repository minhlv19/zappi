import { IUpdateStoreAction, StoreActions } from './StoreActions';

const StoreReducer = (state = {}, action: IUpdateStoreAction) => {
  switch (action.type) {
    case StoreActions.UPDATE_STORE_DATA:
      return {
        ...state,
        ...action.data,
      };
    case StoreActions.CLEAR_STORE_DATA:
      return {};

    default:
      return state;
  }
};

export default StoreReducer;
