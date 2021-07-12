import { API_STORE } from '@env';
import { RootState } from 'App/Redux';
import { ActionResponse, Store } from 'App/Types';
import { EStatusOrder, IFulfillmentData, IOrder } from 'App/Types/order';
import { getStoredProperty } from 'App/Utils/storage';
import axios from 'axios';
import { useSelector } from 'react-redux';

export const requestFetchOrder = async (storeId?: string) => {
  if (!storeId) {
    const storeInfo: Store = await getStoredProperty('storeInfo');
    if (storeInfo) {
      storeId = storeInfo.id;
    }
  }
  return axios.get<IOrder[]>(`${API_STORE}/api/store/store/${storeId}/order`).then(res => res.data);
};

export const requestRejectOrder = async (orderId: string, reason: string, storeId?: string) => {
  if (!storeId) {
    const storeInfo: Store = await getStoredProperty('storeInfo');
    if (storeInfo) {
      storeId = storeInfo.id;
    }
  }
  return axios.post<ActionResponse>(`${API_STORE}/api/store/store/${storeId}/order/${orderId}/reject`, {
    reason,
  });
};

export const requestAcceptOrder = async (orderId: string, storeId?: string) => {
  if (!storeId) {
    const storeInfo: Store = await getStoredProperty('storeInfo');
    if (storeInfo) {
      storeId = storeInfo.id;
    }
  }
  return axios
    .post<ActionResponse>(`${API_STORE}/api/store/store/${storeId}/order/${orderId}/accept`)
    .then(res => res.data);
};

export const requestFulfillOrder = async (data: IFulfillmentData, orderId: string, storeId?: string) => {
  if (!storeId) {
    const storeInfo: Store = await getStoredProperty('storeInfo');
    if (storeInfo) {
      storeId = storeInfo.id;
    }
  }
  return axios
    .post<ActionResponse>(`${API_STORE}/api/store/store/${storeId}/order/${orderId}/fulfill`, data)
    .then(res => res.data);
};

export const requestSearchOrder = async (searchText: string, status: EStatusOrder, storeId?: string) => {
  if (!storeId) {
    const storeInfo: Store = await getStoredProperty('storeInfo');
    if (storeInfo) {
      storeId = storeInfo.id;
    }
  }
  return axios
    .get<IOrder[]>(`${API_STORE}/api/store/store/${storeId}/order/search?searchText=${searchText}&status=${status}`)
    .then(res => res.data);
};
