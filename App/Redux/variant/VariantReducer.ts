import { StyleDropdownRowData } from 'App/Components/StyledDropdownSelect/StyledDropdownSelect';
import { Variant } from 'App/Types';
import { RootStateDefault } from '..';
import { IVariantAction, VariantAction } from './VariantAction';

export interface variantsSelection {
  selectionIndex: string;
  selectionValue: StyleDropdownRowData | null;
}

export interface variantsSelection {
  selectionIndex: string;
  selectionValue: StyleDropdownRowData | null;
}

export interface IVariantsValueOptions {
  title: string;
  price: string[];
  isAvailable: boolean;
  numberInStock: string[];
}

export interface variantChoice {
  min: string;
  max: string;
}

export interface IVariantOption {
  title: string;
  isNull?: boolean;
  isFocus?: boolean;
}

export interface VariantReduxState {
  variantsCategories: Variant[];
  variantsCategoriesDropDown: StyleDropdownRowData[];
  variantsSelections: variantsSelection[];
  variantsValueOptions: IVariantsValueOptions[][]; //Value Option is table
  variantsChoice: variantChoice[];
  variantsOption: IVariantOption[][];
}
const VariantReducer = (state = RootStateDefault.variant, action: IVariantAction): VariantReduxState => {
  switch (action.type) {
    case VariantAction.FETCH_VARIANT_CATEGORIES:
      return {
        ...state,
        variantsCategories: action.data.variantCategories as Variant[],
        variantsCategoriesDropDown: action.data.variantsCategoriesDropDown as StyleDropdownRowData[],
        variantsSelections: action.data.variantsSelections,
        variantsValueOptions: action.data.variantsValueOptions,
        variantsOption: action.data.variantsOption,
      };
    case VariantAction.SET_SELECT_VARIANT_CATEGORIES:
      return {
        ...state,
        variantsSelections: action.data.variantsSelections,
        variantsValueOptions: action.data.variantsValueOptions,
        variantsOption: action.data.variantsOption,
      };
    case VariantAction.ON_CHANGE_VARIANT_VALUE_OPTIONS:
      return {
        ...state,
        variantsValueOptions: action.data,
      };
    case VariantAction.ON_CHANGE_VARIANT_CHOICE:
      return {
        ...state,
        variantsChoice: action.data,
      };

    case VariantAction.ADD_VARIANT:
      return {
        ...state,
        variantsSelections: action.data,
      };
    case VariantAction.FORCE_SET_VARIANT:
      return {
        ...state,
        variantsSelections: action.data[0],
        variantsValueOptions: action.data[1],
        variantsChoice: action.data[2],
        variantsOption: action.data[3],
      };
    case VariantAction.ON_CLICK_VARIANT_OPTION:
      return {
        ...state,
        variantsOption: action.data.variantsOption,
        variantsValueOptions: action.data.variantsValueOptions,
      };
    default:
      return state;
  }
};
export default VariantReducer;
