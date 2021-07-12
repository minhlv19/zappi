import { API_STORE } from '@env';
import {
  ActionResponse,
  Category,
  DeliveryProfile,
  Product,
  ProductFilterEnums,
  ProductFilterInputParams,
  ProductOrderByEnums,
  Store,
  Variant,
  UploadPhotoResponse,
  VariantOption,
} from 'App/Types';
import { getStoredProperty } from 'App/Utils/storage';

import axios from 'axios';

export const requestGetProducts = async (storeId: string) => {
  return axios.get<Product[]>(`${API_STORE}/api/store/store/${storeId}/product`).then(res => res.data);
};

export const requestSearchProducts = async (
  storeId: string | undefined = undefined,
  searchText: string,
  orderBy: ProductOrderByEnums,
  filter: ProductFilterEnums,
  categoryId: string,
) => {
  if (!storeId) {
    const storeInfo: Store = await getStoredProperty('storeInfo');
    if (storeInfo) {
      storeId = storeInfo.id;
    }
  }

  let filterParams: ProductFilterInputParams = {};
  if (searchText) {
    filterParams.searchText = searchText;
  }

  if (orderBy) {
    filterParams.orderBy = orderBy;
  }

  if (filter) {
    filterParams.filter = filter;
  }

  if (categoryId) {
    filterParams.categoryId = categoryId;
  }

  console.log('filterParams', filterParams);

  return axios
    .get<Product[]>(`${API_STORE}/api/store/store/${storeId}/product/search`, { params: filterParams })
    .then(res => res.data);
};

export const requestDeleteProduct = async (storeId: string, productId: string) => {
  return axios
    .delete<ActionResponse>(`${API_STORE}/api/store/store/${storeId}/product/${productId}`)
    .then(res => res.data);
};

export const requestUpdateProduct = async (storeId: string, productId: string, updatedProduct: Partial<Product>) => {
  return axios
    .put<ActionResponse>(`${API_STORE}/api/store/store/${storeId}/product/${productId}`, updatedProduct)
    .then(res => res.data);
};

export const requestGetDeliveryProfiles = async (storeId: string | undefined = undefined) => {
  if (!storeId) {
    const storeInfo: Store = await getStoredProperty('storeInfo');
    if (storeInfo) {
      storeId = storeInfo.id;
    }
  }
  return axios.get<DeliveryProfile[]>(`${API_STORE}/api/store/store/${storeId}/delivery-profile`).then(res => res.data);
};

export const requestCreateDeliveryProfile = async (data: DeliveryProfile, storeId: string | undefined = undefined) => {
  if (!storeId) {
    const storeInfo: Store = await getStoredProperty('storeInfo');
    if (storeInfo) {
      storeId = storeInfo.id;
    }
  }
  return axios
    .post<DeliveryProfile>(`${API_STORE}/api/store/store/${storeId}/delivery-profile`, data)
    .then(res => res.data);
};

export const requestUploadProductImage = async (formData: FormData, storeId: string | undefined = undefined) => {
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

export const requestCreateProduct = async (data: Product, storeId: string | undefined = undefined) => {
  if (!storeId) {
    const storeInfo: Store = await getStoredProperty('storeInfo');
    if (storeInfo) {
      storeId = storeInfo.id;
    }
  }
  return axios.post<Product>(`${API_STORE}/api/store/store/${storeId}/product`, data).then(res => res.data);
};

export const requestReorderProduct = async (storeId: string, updatedProducts: Partial<Product>[]) => {
  return axios
    .put<ActionResponse>(`${API_STORE}/api/store/store/${storeId}/product/reorder`, updatedProducts)
    .then(res => res.data);
};
