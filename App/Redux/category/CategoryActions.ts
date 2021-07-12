import { Category, CategoryFilterEnums, CategoryFilterInputParams } from 'App/Types';

export enum CategoryActions {
  FETCH_CATEGORY_INFO_ASYNC = 'FETCH_CATEGORY_INFO_ASYNC',
  SET_CATEGORIES_DATA = 'SET_CATEGORIES_DATA',
  CLEAR_CATEGORY_DATA = 'CLEAR_CATEGORY_DATA',
  SET_DISPLAYED_CATEGORIES_DATA = 'SET_DISPLAYED_CATEGORIES_DATA',
  SET_DISPLAYED_CATEGORIES_DATA_ASYNC = 'SET_DISPLAYED_CATEGORIES_DATA_ASYNC',
  DELETE_CATEGORY = 'DELETE_CATEGORY',
  DELETE_CATEGORY_ASYNC = 'DELETE_CATEGORY_ASYNC',
  SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY',
  UPDATE_CATEGORY = 'UPDATE_CATEGORY',
  UPDATE_CATEGORY_ASYNC = 'UPDATE_CATEGORY_ASYNC',
  SET_CATEGORY_DISPLAY_FILTER = 'SET_CATEGORY_DISPLAY_FILTER',
  REORDER_CATEGORY_ASYNC = 'REORDER_CATEGORY_ASYNC',
  REORDER_CATEGORY = 'REORDER_CATEGORY',
}

export interface IUpdateCategoryAction {
  type: CategoryActions;
  data: Partial<Category>;
}

export interface IRequestGetCategoryInfoAction {
  type: CategoryActions;
}

export interface IClearCategoryDataAction {
  type: CategoryActions;
}

export interface ICategoryAction {
  type: CategoryActions;
  data: any;
}

export interface ISearchCategoriesAction {
  type: CategoryActions;
  data: {
    storeId: string;
    filter: CategoryFilterInputParams;
  };
}

export interface IDeleteCategoryAction {
  type: CategoryActions;
  data: {
    categoryId: string;
  };
}

export interface ICategoryGeneralAction<T> {
  type: CategoryActions;
  data: T;
}

export const setCategoryDataAction = (categories: Category[]) => {
  return { type: CategoryActions.SET_CATEGORIES_DATA, data: categories } as ICategoryAction;
};

export const setDisplayedCategoryDataAction = (categories: Category[]) => {
  return { type: CategoryActions.SET_DISPLAYED_CATEGORIES_DATA, data: categories } as ICategoryAction;
};

export const fetchCategoryInfoActionAsync = () => {
  return { type: CategoryActions.FETCH_CATEGORY_INFO_ASYNC } as IRequestGetCategoryInfoAction;
};

export const clearCategoryDataAction = () => {
  return { type: CategoryActions.CLEAR_CATEGORY_DATA } as IClearCategoryDataAction;
};

export const searchCategoriesAsyncAction = (searchText: string, filter: CategoryFilterEnums) => {
  return {
    type: CategoryActions.SET_DISPLAYED_CATEGORIES_DATA_ASYNC,
    data: { searchText, filter },
  } as ICategoryGeneralAction<CategoryFilterInputParams>;
};

export const deleteCategoryAsyncAction = (categoryId: string) => {
  return { type: CategoryActions.DELETE_CATEGORY_ASYNC, data: { categoryId } } as IDeleteCategoryAction;
};

export const setSelectedCategoryAction = (category: Category) => {
  return { type: CategoryActions.SET_SELECTED_CATEGORY, data: category } as ICategoryGeneralAction<Category>;
};

export const updateCategoryAsyncAction = (updatedCategory: Partial<Category>) => {
  return { type: CategoryActions.UPDATE_CATEGORY_ASYNC, data: updatedCategory } as ICategoryGeneralAction<
    Partial<Category>
  >;
};

export const reorderCategoryAsyncAction = (updatedCategories: Partial<Category>[]) => {
  return { type: CategoryActions.REORDER_CATEGORY_ASYNC, data: updatedCategories } as ICategoryGeneralAction<
    Partial<Category>[]
  >;
};

export const setCategoryDisplayFilterAction = (searchText: string, filter: CategoryFilterEnums) => {
  return {
    type: CategoryActions.SET_CATEGORY_DISPLAY_FILTER,
    data: { searchText, filter },
  } as ICategoryGeneralAction<CategoryFilterInputParams>;
};
