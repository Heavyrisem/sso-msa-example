import React, { useMemo } from 'react';
import { GoogleLoginButton, GithubLoginButton } from 'react-social-login-buttons';

import tw from 'twin.macro';

import KakaoLoginButton from '@components/KakaoLoginButton';
import DefaultLayout from '@components/Layouts/DefaultLayout';
import useUser from '@hooks/useUser';

const SSOLogin: React.FC = () => {
  const { redirectSSO } = useUser();

  const loginButtonStyle = useMemo(
    () => [
      tw`!w-[98%] !h-[50px]`,
      tw`!px-3 !py-2`,
      tw`!rounded-lg !text-sm`,
      tw`!transition-colors`,
    ],
    [],
  );

  return (
    <DefaultLayout css={[tw`flex flex-col justify-center items-center`]}>
      <div css={[tw`text-4xl font-extrabold mb-8`]}>Login</div>
      <div css={[tw`w-[15rem]`, tw`mx-auto`, tw`flex flex-col justify-center items-center gap-2`]}>
        <GoogleLoginButton css={loginButtonStyle} onClick={() => redirectSSO('google')} />
        <GithubLoginButton css={loginButtonStyle} onClick={() => redirectSSO('github')} />
        <KakaoLoginButton
          css={[loginButtonStyle, tw`!text-center`]}
          onClick={() => redirectSSO('kakao')}
        />
      </div>
    </DefaultLayout>
  );
};

export default SSOLogin;
