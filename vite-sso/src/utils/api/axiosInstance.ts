/* eslint-disable no-param-reassign */
import axios from 'axios';

import useToken from '@hooks/getToken';

const axiosInstance = axios.create({
  withCredentials: true,
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     try {
//       const token = useToken();
//       console.log('useToken()', token);
//       const auth = token ? `Bearer ${token}` : '';
//       config.headers.common.Authorization = auth;
//       return config;
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   },
//   (error) => Promise.reject(error),
// );

export default axiosInstance;
