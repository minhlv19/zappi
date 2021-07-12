import { StyleDropdownRowData } from 'App/Components/StyledDropdownSelect/StyledDropdownSelect';
import { Variant } from 'App/Types';
import { variantChoice, variantsSelection, IVariantsValueOptions } from './VariantReducer';

export enum VariantAction {
  FETCH_VARIANT_CATEGORIES_ASYNC = 'FETCH_VARIANT_CATEGORIES_ASYNC',
  FETCH_VARIANT_CATEGORIES = 'FETCH_VARIANT_CATEGORIES',

  SET_SELECT_VARIANT_CATEGORIES_ASYNC = 'SET_SELECT_VARIANT_CATEGORIES_ASYNC',
  SET_SELECT_VARIANT_CATEGORIES = 'SET_SELECT_VARIANT_CATEGORIES',

  ON_CHANGE_VARIANT_VALUE_OPTIONS_ASYNC = 'ON_CHANGE_VARIANT_VALUE_OPTIONS_ASYNC',
  ON_CHANGE_VARIANT_VALUE_OPTIONS = 'ON_CHANGE_VARIANT_VALUE_OPTIONS',

  ON_CHANGE_VARIANT_CHOICE_ASYNC = 'ON_CHANGE_VARIANT_CHOICE_ASYNC',
  ON_CHANGE_VARIANT_CHOICE = 'ON_CHANGE_VARIANT_CHOICE',

  ADD_VARIANT_ASYNC = 'ADD_VARIANT_ASYNC',
  ADD_VARIANT = 'ADD_VARIANT',

  FORCE_SET_VARIANT_ASYNC = 'FORCE_SET_VARIANT_ASYNC',
  FORCE_SET_VARIANT = 'FORCE_SET_VARIANT',

  DELETE_VARIANT_ASYNC = 'DELETE_VARIANT_ASYNC',

  ON_CLICK_VARIANT_OPTION = 'ON_CLICK_VARIANT_OPTION',
  ON_CLICK_VARIANT_OPTION_ASYNC = 'ON_CLICK_VARIANT_OPTION_ASYNC',
}

export interface IVariantAction {
  type: VariantAction;
  data: any;
}

interface ISingleRequest {
  type: VariantAction;
}

export interface IVariantGeneralAction<T> {
  type: VariantAction;
  data: T;
}

export const fetchVariantCategoriesAsyncAction = (idChange?: string, indexVC?: number) => {
  return {
    type: VariantAction.FETCH_VARIANT_CATEGORIES_ASYNC,
    data: {
      idChange,
      indexVC,
    },
  };
};

export interface ISetSelectVariantCategories {
  index: number;
  selectionIndex: string;
  selectionValue: StyleDropdownRowData | null;
  isSetValueOption: boolean;
}

export const setSelectVariantCategories = (
  index: number,
  indexSelection: string,
  data: StyleDropdownRowData,
  isSetValueOption: boolean = true,
) => {
  return {
    type: VariantAction.SET_SELECT_VARIANT_CATEGORIES_ASYNC,
    data: {
      index,
      selectionIndex: indexSelection,
      selectionValue: data,
      isSetValueOption,
    },
  } as IVariantGeneralAction<ISetSelectVariantCategories>;
};

export interface IOnChangeVariantValueOptions {
  indexVariantCategory: number;
  indexItem: number;
  action: string;
  value: string | boolean;
  orderOfData?: number;
}

export const onChangeVariantValueOptions = (
  indexVC: number,
  indexItem: number,
  action: string,
  data: string | boolean,
  orderOfData?: number,
) => {
  return {
    type: VariantAction.ON_CHANGE_VARIANT_VALUE_OPTIONS_ASYNC,
    data: {
      indexVariantCategory: indexVC,
      indexItem,
      action,
      value: data,
      orderOfData,
    },
  } as IVariantGeneralAction<IOnChangeVariantValueOptions>;
};

export interface IOnChangeVariantChoice {
  indexVariantCategory: number;
  action: string;
  value: string;
}

export const onChangeVariantChoice = (indexVC: number, action: string, data: string) => {
  return {
    type: VariantAction.ON_CHANGE_VARIANT_CHOICE_ASYNC,
    data: {
      indexVariantCategory: indexVC,
      action,
      value: data,
    },
  } as IVariantGeneralAction<IOnChangeVariantChoice>;
};

export const addVariant = () => {
  return { type: VariantAction.ADD_VARIANT_ASYNC } as IVariantGeneralAction<ISingleRequest>;
};

export const forseSetVariant = (data: any) => {
  return { type: VariantAction.FORCE_SET_VARIANT_ASYNC, data };
};

export const deleteVariant = (index: number) => {
  return { type: VariantAction.DELETE_VARIANT_ASYNC, data: index };
};

export const onClickVariantOption = (indexVC: number, indexItem: number) => {
  return {
    type: VariantAction.ON_CLICK_VARIANT_OPTION_ASYNC,
    data: { indexVariantCategory: indexVC, indexItem },
  };
};
