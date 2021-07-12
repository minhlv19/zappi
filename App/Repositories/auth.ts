import { API_AUTHORIZATION } from '@env';
import { logError } from 'App/Utils/error';
import DataStorage from 'App/Utils/storage';
import axios from 'axios';
import { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh';

const authAxios = axios.create();

export const requestSendOTP = async (phoneNumber: string, isLoggingIn: string) => {
  if (isLoggingIn) {
    return authAxios.post(
      `${API_AUTHORIZATION}/api/iam/auth/otp/login`,
      {
        phoneNumber,
      },
      {} as AxiosAuthRefreshRequestConfig,
    );
  }
  return authAxios.post(`${API_AUTHORIZATION}/api/iam/auth/otp/register`, {
    phoneNumber,
  });
};

export const requestVerifyOTP = async (phoneNumber: string, OTPCode: string) => {
  return authAxios.post(`${API_AUTHORIZATION}/api/iam/auth/otp/verify`, {
    phoneNumber,
    otp: OTPCode,
    namespace: 'zaapi-sellers',
  });
};

export const requestRefreshToken = async () => {
  const refreshToken = await DataStorage.load({ key: 'refreshToken' });
  const accessToken = await DataStorage.load({ key: 'accessToken' });
  if (!refreshToken || !accessToken) throw new Error('Refresh token or access token not found!');

  return authAxios.put(
    `${API_AUTHORIZATION}/api/iam/auth/refresh`,
    {
      refreshToken,
    },
    {
      skipAuthRefresh: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    } as AxiosAuthRefreshRequestConfig,
  );
};

const KEYS_TO_REMOVE_AFTER_LOGOUT = ['refreshToken', 'accessToken', 'storeInfo'];
export const logout = async () => {
  const refreshToken = await DataStorage.load({ key: 'refreshToken' });

  await Promise.all(KEYS_TO_REMOVE_AFTER_LOGOUT.map(key => DataStorage.remove({ key })));

  if (refreshToken) {
    axios.post(`${API_AUTHORIZATION}/api/iam/auth/logout`, {
      refreshToken,
    });
  }
  return;
};

export const requestIsLoggedIn = async () => {
  let refreshToken;
  let accessToken;
  try {
    refreshToken = await DataStorage.load({ key: 'refreshToken' });
    accessToken = await DataStorage.load({ key: 'accessToken' });
  } catch (error) {
    logError(error);
  }
  return refreshToken && accessToken;
};
