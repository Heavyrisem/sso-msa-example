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

  // sso_flowchart의 2번 구조에서는 쓰이지 않음 (feautre/use_redirect 브랜치)
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

  const logout = useCallback(() => {
    axiosInstance.get('/api/auth/logout');
    resetAuthorization();
    setUser(null);
  }, [axiosInstance, resetAuthorization, setUser]);

  return {
    logout,
    fetchUser,
    redirectSSO,
    ssoLogin,
  };
};

export default useUser;
