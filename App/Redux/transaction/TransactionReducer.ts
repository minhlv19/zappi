import { Transaction } from 'App/Types';
import { RootStateDefault } from '..';
import { ITransactionGeneralAction, TransactionActions } from './TransactionActions';

export interface TransactionReduxState {
  createDiscount: Transaction;
  updateDiscount: Transaction;
}

const TransactionReducer = (
  state = RootStateDefault.transaction,
  action: ITransactionGeneralAction<any>,
): TransactionReduxState => {
  switch (action.type) {
    case TransactionActions.UPDATE_TRANSACTION:
      return {
        ...state,
        [action.data.name]: {
          ...(state as any)[action.data.name],
          ...action.data.data,
        },
      };

    default:
      return state;
  }
};

export default TransactionReducer;
