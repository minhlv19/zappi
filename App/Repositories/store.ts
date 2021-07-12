import { API_STORE } from '@env';
import { Store, UpdateLogo } from 'App/Types';
import DataStorage from 'App/Utils/storage';

import axios from 'axios';

export const requestGetStoreInfo = async (accessToken: string = '') => {
  let storeInfo: Store;
  if (!accessToken) {
    storeInfo = await axios.get<Store>(`${API_STORE}/api/store/stores`).then(res => res.data);
  } else {
    storeInfo = await axios
      .create()
      .get<Store>(`${API_STORE}/api/store/stores`, { headers: { Authorization: `Bearer ${accessToken}` } })
      .then(res => res.data);
  }
  await DataStorage.save({ key: 'storeInfo', data: storeInfo });
  return storeInfo;
};

export const updateAvatarStore = (file: any) => {
  let formData = new FormData();
  formData.append('file', file);
  return axios.post<UpdateLogo>(`${API_STORE}/api/store/store-logo`, formData).then(res => res.data);
};

export const requestCreateStore = (body: any) =>
  axios.post<Store>(`${API_STORE}/api/store/stores`, body).then(res => res.data);

export const requestUpdateStore = (body: Partial<Store>) => axios.put(`${API_STORE}/api/store/stores`, body);
