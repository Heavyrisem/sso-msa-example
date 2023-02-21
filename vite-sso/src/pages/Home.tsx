import React, { useCallback, useEffect, useState } from 'react';

import { AxiosError } from 'axios';
import { useRecoilValue } from 'recoil';
import tw from 'twin.macro';

import Button from '@components/Button';
import Input from '@components/Input';
import DefaultLayout from '@components/Layouts/DefaultLayout';
import useAxiosInstance from '@hooks/useAxiosInstance';
import useUser from '@hooks/useUser';
import authorizationState from '@recoil/atoms/authorization';
import userState from '@recoil/atoms/user';
import jwtSelector from '@recoil/selectors/jwt';
import { updateUserInfo } from '@utils/api/user';

const Home: React.FC = () => {
  const axiosInstance = useAxiosInstance();
  const authorization = useRecoilValue(authorizationState);
  const user = useRecoilValue(userState);
  const jwt = useRecoilValue(jwtSelector);
  const { fetchUser, logout } = useUser();

  const [message, setMessage] = useState<string>();
  const [expireIn, setExpireIn] = useState<number>(-1);
  const [userDisplayName, setUserDisplayName] = useState<string | undefined>(user?.displayName);

  const handleTestClick = useCallback(async () => {
    setMessage(undefined);
    const response = await axiosInstance
      .get('/api/user/test')
      .then((res) => res.data)
      .catch((err) => JSON.stringify((err as AxiosError).response?.data));
    setMessage(response);
  }, [axiosInstance]);

  const handleUpdateUserInfoClick = useCallback(async () => {
    await updateUserInfo(axiosInstance, {
      providerId: user?.providerId,
      displayName: userDisplayName,
    });
    fetchUser();
  }, [axiosInstance, fetchUser, user?.providerId, userDisplayName]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!jwt) return;
      const expire = new Date(jwt.exp).getTime() - Date.now();
      setExpireIn(expire / 1000);
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [jwt]);

  return (
    <DefaultLayout>
      <div css={[tw`text-4xl font-extrabold mb-8`]}>Home</div>
      <div css={[tw`flex flex-col gap-4`]}>
        <Button css={[tw`w-52`]} onClick={handleTestClick}>
          AuthenticationTest
        </Button>
        {message && <div>{message}</div>}
        <Button css={[tw`w-52`]} onClick={handleUpdateUserInfoClick}>
          UpdateUserInfo
        </Button>
        <Input
          css={[tw`w-52`]}
          type="text"
          onChange={(e) => setUserDisplayName(e.target.value)}
          value={userDisplayName}
        />
        <Button css={[tw`w-52`]} onClick={logout}>
          Logout
        </Button>
        <div>UserDetail</div>
        {user?.profileImage && (
          <div css={[tw`w-20 h-20 overflow-hidden rounded-full`]}>
            <img src={user.profileImage} alt="profile" />
          </div>
        )}
        <div css={[tw`text-sm text-zinc-200`]}>
          <pre css={[tw`break-all whitespace-pre-wrap overflow-hidden`]}>
            {JSON.stringify(user, null, 4)}
          </pre>
          <span>{expireIn > 0 ? `${expireIn} 초 후 Access 토큰 만료` : '토큰 만료됨'}</span>
        </div>
        <div css={[tw`break-all text-xs text-zinc-600`]}>{authorization.token}</div>
      </div>
    </DefaultLayout>
  );
};

export default Home;
