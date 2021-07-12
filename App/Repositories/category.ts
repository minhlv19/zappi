import { API_STORE } from '@env';
import {
  ActionResponse,
  DeliveryProfile,
  Category,
  CategoryFilterEnums,
  CategoryFilterInputParams,
  Store,
  UploadPhotoResponse,
} from 'App/Types';
import { getStoredProperty } from 'App/Utils/storage';

import axios from 'axios';

export const requestSearchCategories = async (storeId: string, searchText: string, filter: CategoryFilterEnums) => {
  let filterParams: CategoryFilterInputParams = {};
  if (searchText) {
    filterParams.searchText = searchText;
  }

  if (filter) {
    filterParams.filter = filter;
  }

  const categories = await axios
    .get<Category[]>(`${API_STORE}/api/store/store/${storeId}/category/search`, { params: filterParams })
    .then(res => res.data);
  return categories;
};

export const requestDeleteCategory = async (storeId: string, categoryId: string) => {
  return axios
    .delete<ActionResponse>(`${API_STORE}/api/store/store/${storeId}/category/${categoryId}`)
    .then(res => res.data);
};

export const requestUpdateCategory = async (
  storeId: string,
  categoryId: string,
  updatedCategory: Partial<Category>,
) => {
  return axios
    .put<ActionResponse>(`${API_STORE}/api/store/store/${storeId}/category/${categoryId}`, updatedCategory)
    .then(res => res.data);
};

export const requestCreateCategory = async (data: Category, storeId: string | undefined = undefined) => {
  if (!storeId) {
    const storeInfo: Store = await getStoredProperty('storeInfo');
    if (storeInfo) {
      storeId = storeInfo.id;
    }
  }
  return axios.post<Category>(`${API_STORE}/api/store/store/${storeId}/category`, data).then(res => res.data);
};

export const requestGetCategories = async (storeId: string | undefined = undefined) => {
  if (!storeId) {
    const storeInfo: Store = await getStoredProperty('storeInfo');
    if (storeInfo) {
      storeId = storeInfo.id;
    }
  }
  return axios.get<Category[]>(`${API_STORE}/api/store/store/${storeId}/category`).then(res => res.data);
};

export const requestUploadImageCategory = async (formData: FormData, storeId: string | undefined = undefined) => {
  if (!storeId) {
    const storeInfo: Store = await getStoredProperty('storeInfo');
    if (storeInfo) {
      storeId = storeInfo.id;
    }
  }
  return axios
    .post(`${API_STORE}/api/store/store/${storeId}/category/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => res.data);
};

export const requestUploadCategoryImage = async (formData: FormData, storeId: string | undefined = undefined) => {
  if (!storeId) {
    const storeInfo: Store = await getStoredProperty('storeInfo');
    if (storeInfo) {
      storeId = storeInfo.id;
    }
  }
  return axios
    .post<UploadPhotoResponse>(`${API_STORE}/api/store/store/${storeId}/product/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => res.data);
};

export const requestReorderCategory = async (storeId: string, updatedCategories: Partial<Category>[]) => {
  return axios
    .put<ActionResponse>(`${API_STORE}/api/store/store/${storeId}/category/reorder`, updatedCategories)
    .then(res => res.data);
};
