import { Category, CategoryFilterInputParams } from 'App/Types';
import { cloneDeep } from 'lodash';
import { RootStateDefault } from '..';
import { IUpdateCategoryAction, CategoryActions, ICategoryAction } from './CategoryActions';

export interface CategoryReduxState {
  categories: Category[];
  displayedCategories: Category[];
  selectedCategory?: Category;
  displayFilter: CategoryFilterInputParams;
}

const CategoryReducer = (state = RootStateDefault.category, action: ICategoryAction): CategoryReduxState => {
  switch (action.type) {
    case CategoryActions.SET_CATEGORIES_DATA:
      return {
        ...state,
        categories: action.data as Category[],
      };

    case CategoryActions.SET_DISPLAYED_CATEGORIES_DATA:
      return {
        ...state,
        displayedCategories: action.data as Category[],
      };

    case CategoryActions.CLEAR_CATEGORY_DATA:
      return RootStateDefault.category;

    case CategoryActions.DELETE_CATEGORY:
      return {
        ...state,
        displayedCategories: state.displayedCategories.filter(category => category.id != action.data.categoryId),
      };

    case CategoryActions.SET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.data,
      };

    case CategoryActions.UPDATE_CATEGORY:
      const index = state.displayedCategories.findIndex(category => category.id === action.data.id);

      if (index > -1) {
        let displayedCategories = cloneDeep(state.displayedCategories);
        displayedCategories[index] = {
          ...state.displayedCategories[index],
          ...action.data,
        };

        return {
          ...state,
          displayedCategories,
        };
      }
      return state;

    case CategoryActions.SET_CATEGORY_DISPLAY_FILTER:
      return {
        ...state,
        displayFilter: action.data,
      };

    default:
      return state;
  }
};

export default CategoryReducer;
