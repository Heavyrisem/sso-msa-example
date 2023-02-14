import { useCallback } from 'react';

import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { LoginResponse, RegisterResponse } from 'types/API';

import { OAuthState, Shared } from '@heavyrisem/sso-msa-example-proto';
import { BaseAtom } from '@recoil/atom.interface';
import authorizationState from '@recoil/atoms/authorization';
import userState from '@recoil/atoms/user';
// import axiosInstance from '@utils/api/axiosInstance';
import { getLoggedInUser } from '@utils/api/user';
import createQueryParameter from '@utils/url.util';

import useAxiosInstance from './useAxiosInstance';

export interface BasicRegisterForm {
  email: string;
  name: string;
  password: string;
}
export interface BasicLoginForm {
  email: string;
  password: string;
}
export interface TwoFactorLoginForm {
  twoFactorCode: string;
}

const useUser = () => {
  const axiosInstance = useAxiosInstance();
  const setAuthorization = useSetRecoilState(authorizationState);
  const resetAuthorization = useResetRecoilState(authorizationState);
  const setUser = useSetRecoilState(userState);

  const fetchUser = useCallback(
    async (token?: string) => {
      // FIXME: token update 직후에 user 업데이트를 하는 경우, authorization 값이 비어있어서 401 반환
      const headers = token
        ? {
            authorization: `Bearer ${token}`,
          }
        : {};
      const { result: user } = await getLoggedInUser(axiosInstance, { headers }).catch(() => ({
        result: null,
      }));

      console.log('Setting user', user);
      setUser(user);
    },
    [axiosInstance, setUser],
  );

  const redirectSSO = useCallback((provider: 'google' | 'github' | 'kakao') => {
    const params = createQueryParameter({
      redirect: `${window.location.origin}/api/auth/setRefresh?redirect=${window.location.origin}`,
      provider,
    });
    // redirect=http://localhost:3000/auth/test&callback=http://localhost:3000/auth/callback/google&provider=google
    window.location.href = `${window.location.origin}/api/auth?${params}`;
    // 사실 그냥 위에서 바로 SSO 로 보내도 되는데 프론트에 SSO URL 을 저장하기 싫어서 Client Server 한번 거치게 해둠
  }, []);

  const ssoLogin = useCallback(async () => {
    const query = new URLSearchParams(window.location.search);
    const rawState = query.get('state');
    if (!rawState) throw new Error('Invalid state');
    const state = JSON.parse(rawState) as OAuthState;

    const request = {
      url: `/api/auth/callback/${Shared.providerToString(state.provider)}${window.location.search}`,
      method: 'GET',
    };

    const { accessToken: token } = await axiosInstance<LoginResponse>(request).then(
      (res) => res.data,
    );
    setAuthorization({ token });
    fetchUser(token);
  }, [axiosInstance, fetchUser, setAuthorization]);

  const login = useCallback(
    async ({ saveStorage, ...data }: BasicLoginForm & BaseAtom) => {
      const response = await axiosInstance
        .post<LoginResponse>('/api/auth/login', data)
        .then((res) => res.data);

      if (response) {
        const { accessToken: token } = response;
        setAuthorization({ token, saveStorage });
        fetchUser(token);
      }
    },
    [axiosInstance, fetchUser, setAuthorization],
  );

  const logout = useCallback(() => {
    axiosInstance.get('/api/auth/logout');
    resetAuthorization();
    setUser(null);
  }, [axiosInstance, resetAuthorization, setUser]);

  const twoFactorLogin = useCallback(
    async (data: TwoFactorLoginForm) => {
      const response = await axiosInstance
        .post<LoginResponse>('/api/auth/login/2fa', data)
        .then((res) => res.data);

      if (response) {
        const { accessToken: token } = response;
        setAuthorization({ token });
        fetchUser(token);
      }
    },
    [axiosInstance, fetchUser, setAuthorization],
  );

  const register = useCallback(
    async (data: BasicRegisterForm) => {
      const response = await axiosInstance
        .post<RegisterResponse>('/api/auth/register', data)
        .then((res) => res.data);

      if (response) {
        const { accessToken: token } = response;
        setAuthorization({ token });
        fetchUser(token);
      }
    },
    [axiosInstance, fetchUser, setAuthorization],
  );

  return {
    login,
    logout,
    twoFactorLogin,
    register,
    fetchUser,
    redirectSSO,
    ssoLogin,
  };
};

export default useUser;
