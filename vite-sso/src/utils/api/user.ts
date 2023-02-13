import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { UserMeResponse } from 'types/API';

import { ServiceUser } from '@recoil/atoms/user';

export const getLoggedInUser = (axiosInstance: AxiosInstance, options?: AxiosRequestConfig) => {
  console.log(axiosInstance.get);
  return axiosInstance.get<UserMeResponse>('/api/user/me', options).then((res) => res.data);
};

export const updateUserInfo = (
  axiosInstance: AxiosInstance,
  data: Partial<ServiceUser>,
  options?: AxiosRequestConfig,
) => {
  return axiosInstance.post(`/api/user/${data.providerId}`, data, options).then((res) => res.data);
};
