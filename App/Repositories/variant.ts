import { Variant, VariantOption } from 'App/Types';
import axios from 'axios';
import { API_STORE } from '@env';

export const requestGetVariantCategories = () => {
  return axios.get<Variant[]>(`${API_STORE}/api/store/variants`).then(res => res.data);
};

export const requestUpdateMasterVariant = async (data: { name: string; options: VariantOption[] }, id: string) => {
  return axios.patch<Variant>(`${API_STORE}/api/store/variants/${id}`, data).then(res => res.data);
};

export const requestCreateMasterVariant = async (data: { name: string; options: any }) => {
  return axios.post<Variant>(`${API_STORE}/api/store/variants`, data).then(res => res.data);
};
