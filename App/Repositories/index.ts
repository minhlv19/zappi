import { logError } from 'App/Utils/error';
import DataStorage from 'App/Utils/storage';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { requestRefreshToken } from './auth';

let bearerTokenInterceptorId = 0;

export let tokenTemporaryStorage = {
  accessToken: '',
};

const getAccessToken = () => tokenTemporaryStorage.accessToken;

const setupBearerTokenInterceptor = async (accessToken: string = '') => {
  bearerTokenInterceptorId = axios.interceptors.request.use(
    function (config) {
      config.headers['Authorization'] = `Bearer ${getAccessToken()}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );
};

const refreshAuthLogic = async (failedRequest: any) => {
  try {
    console.log('refreshAuthLogic');
    const { data } = await requestRefreshToken();
    await DataStorage.save({ key: 'accessToken', data: data.access_token });
    await DataStorage.save({ key: 'refreshToken', data: data.refresh_token });
    tokenTemporaryStorage.accessToken = data.access_token;
    await setupBearerTokenInterceptor();
    failedRequest.response.config.headers['Authorization'] = `Bearer ${data.access_token}`;
    return;
  } catch (error) {
    logError(error);
  }
};

export const setUpRequestInterceptor = async (accessToken: string = '') => {
  tokenTemporaryStorage.accessToken = await DataStorage.load({ key: 'accessToken' });
  console.log('setUpRequestInterceptor', tokenTemporaryStorage.accessToken);
  await setupBearerTokenInterceptor();
  createAuthRefreshInterceptor(axios, refreshAuthLogic, {
    statusCodes: [401],
  });
};

export const clearRequestInterceptor = async () => {
  if (bearerTokenInterceptorId !== 0) {
    axios.interceptors.request.eject(bearerTokenInterceptorId);
    bearerTokenInterceptorId = 0;
  }
};
