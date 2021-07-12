import { Transaction } from 'App/Types';

export enum TransactionActions {
  UPDATE_TRANSACTION = 'UPDATE_TRANSACTION',
}

export interface ITransactionGeneralAction<T> {
  type: TransactionActions;
  data: T;
}

export const updateTransaction = (name: string, data: Partial<Transaction>) => {
  return { type: TransactionActions.UPDATE_TRANSACTION, data: { name, data } } as ITransactionGeneralAction<{
    name: string;
    data: Partial<Transaction>;
  }>;
};

export const resetTransaction = (name: string) => {
  return {
    type: TransactionActions.UPDATE_TRANSACTION,
    data: { name, data: { response: undefined, errorResponse: undefined } },
  } as ITransactionGeneralAction<{ name: string; data: Partial<Transaction> }>;
};
