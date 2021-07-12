import { API_STORE } from '@env';
import { ActionResponse, Store, UploadPhotoResponse } from 'App/Types';
import { Discount, DiscountFilterInputParams, DiscountType } from 'App/Types/discount';
import { getStoredProperty } from 'App/Utils/storage';

import axios from 'axios';

export const requestGetDiscounts = async (storeId: string) => {
  return axios.get<Discount[]>(`${API_STORE}/api/store/store/${storeId}/discount`).then(res => res.data);
};

export const requestSearchDiscounts = async (storeId: string, type: DiscountType, searchText: string) => {
  let filterParams: DiscountFilterInputParams = {};
  if (searchText) {
    filterParams.searchText = searchText;
  }

  if (type) {
    filterParams.type = type;
  }

  return axios
    .get<Discount[]>(`${API_STORE}/api/store/discounts`, { params: filterParams })
    .then(res => res.data);
};

export const requestDeleteDiscount = async (storeId: string, discountId: string) => {
  return axios
    .delete<ActionResponse>(`${API_STORE}/api/store/store/${storeId}/discounts/${discountId}`)
    .then(res => res.data);
};

export const requestUpdateDiscount = async (
  storeId: string,
  discountId: string,
  updatedDiscount: Partial<Discount>,
) => {
  return axios
    .put<ActionResponse>(`${API_STORE}/api/store/store/${storeId}/discounts/${discountId}`, updatedDiscount)
    .then(res => res.data);
};

export const requestUploadDiscountImage = async (formData: FormData, storeId: string | undefined = undefined) => {
  if (!storeId) {
    const storeInfo: Store = await getStoredProperty('storeInfo');
    if (storeInfo) {
      storeId = storeInfo.id;
    }
  }
  return axios
    .post<UploadPhotoResponse>(`${API_STORE}/api/store/store/${storeId}/discount/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => res.data);
};

export const requestCreateDiscount = async (data: Discount) => {
  return axios.post<Discount>(`${API_STORE}/api/store/discounts`, data).then(res => res.data);
};

export const requestReorderDiscount = async (storeId: string, updatedDiscounts: Partial<Discount>[]) => {
  return axios
    .put<ActionResponse>(`${API_STORE}/api/store/store/${storeId}/discount/reorder`, updatedDiscounts)
    .then(res => res.data);
};
