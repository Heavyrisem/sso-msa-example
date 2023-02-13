import { useEffect } from 'react';
import { toast } from 'react-toastify';

import axios from 'axios';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

import authorizationState from '@recoil/atoms/authorization';
import userState from '@recoil/atoms/user';
import { reIssueToken } from '@utils/api/auth';
import { REFRESH_URL } from '@utils/api/constants';
import { getLoggedInUser } from '@utils/api/user';

function useAxiosInstance() {
  const [authorization, setAuthorization] = useRecoilState(authorizationState);
  const resetAuthorization = useResetRecoilState(authorizationState);
  const setUser = useSetRecoilState(userState);
  const axiosInstance = axios.create({
    withCredentials: true,
  });

  useEffect(() => {
    if (authorization.token) {
      axiosInstance.defaults.headers.authorization = `Bearer ${authorization.token}`;
    }
  }, [authorization.token, axiosInstance.defaults.headers]);

  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (res) => res,
      async (err) => {
        console.log('axiosError', err);
        const {
          config,
          response: { status, data },
        } = err;

        if (status === 403) {
          toast.error('권한이 없습니다.');
          const { result: user } = await getLoggedInUser(axiosInstance);
          console.log('ReFetch LoggedInUser', user);
          setUser(user);
          return Promise.reject(err);
        }

        if (config.url !== REFRESH_URL && status === 401) {
          return reIssueToken(axiosInstance)
            .then(async ({ accessToken }) => {
              console.log('RE-ISSUE JWT Token');
              setAuthorization({ token: accessToken });
              config.headers.authorization = `Bearer ${accessToken}`;
              return axiosInstance.request(config);
            })
            .catch((error) => {
              toast.error('로그인이 필요합니다.');
              console.log('TokenExpired');
              resetAuthorization();
              setUser(null);
              return Promise.resolve(error);
            });
        }

        if (config.url === REFRESH_URL) {
          return Promise.reject(err);
        }

        toast.error(`오류가 발생했습니다 (${data?.message})`);
        return Promise.reject(err);
      },
    );
    return () => {
      // axiosInstance.interceptors.request.clear();
      axiosInstance.interceptors.response.clear();
    };
  }, [
    authorization,
    authorization.token,
    axiosInstance,
    axiosInstance.interceptors.response,
    resetAuthorization,
    setAuthorization,
    setUser,
  ]);

  return axiosInstance;
}

export default useAxiosInstance;
