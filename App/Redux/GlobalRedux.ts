import { createAction, UnfoldSagaActionType } from 'redux-unfold-saga';
import { produce } from 'immer';
import { Category, Store } from 'App/Types';

export const REDUX_KEY = 'Global';
export enum ActionTypes {
  SHOW_LOADING = 'SHOW_LOADING',
}

export const Actions = {
  setShowLoading: createAction(ActionTypes.SHOW_LOADING),
};

export interface GlobalState {
  isLoading: boolean;
  store: Partial<Store>;
}

export const defaultState: GlobalState = {
  isLoading: false,
  store: {},
};

export const reducer = (state = defaultState, action: UnfoldSagaActionType): GlobalState => {
  const { type } = action;
  return produce(state, (draftState: GlobalState) => {
    switch (type) {
      case ActionTypes.SHOW_LOADING:
        draftState.isLoading = !state.isLoading;
        break;
    }
  });
};
