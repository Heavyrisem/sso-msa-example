import axios from 'axios';

const axiosInstance = axios.create({
  withCredentials: true,
});

// setAuthorizationHeader함수는 recoil atom effect로 호출
export const setAuthorizationHeader = (token?: string | null) => {
  axiosInstance.defaults.headers.common.Authorization = token ? `Bearer ${token}` : undefined;
};

export default axiosInstance;
