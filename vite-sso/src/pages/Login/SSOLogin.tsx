import React, { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { GoogleLoginButton } from 'react-social-login-buttons';

import { AxiosError } from 'axios';
import tw from 'twin.macro';

import Button from '@components/Button';
import Input from '@components/Input';
import DefaultLayout from '@components/Layouts/DefaultLayout';
import useUser, { BasicLoginForm } from '@hooks/useUser';
import createQueryParameter from '@utils/url.util';

interface BasicLoginProps {
  onLoginSuccess?: () => void;
}

const SSOLogin: React.FC<BasicLoginProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const { redirectSSO } = useUser();

  // const [rememberMe, setRememberMe] = useState(false);
  // const [message, setMessage] = useState<string>();
  // const handleSubmitForm: SubmitHandler<BasicLoginForm> = useCallback(
  //   (data) =>
  //     login({ ...data, saveStorage: rememberMe })
  //       .then(() => {
  //         setMessage(undefined);
  //         onLoginSuccess?.();
  //       })
  //       .catch((err) => {
  //         if (err instanceof AxiosError) {
  //           setMessage(err.response?.data?.message || '로그인에 실패했습니다.');
  //         }
  //       }),
  //   [login, onLoginSuccess, rememberMe],
  // );

  // const handleClickLogin = useCallback(() => {
  //   const params = createQueryParameter({
  //     redirect: `http://localhost:3000/auth`,
  //     callback: `http://localhost:3000/auth/callback/google`,
  //   });

  //   navigate(`/api/auth/google?${params}`);
  // }, [navigate]);

  return (
    <DefaultLayout css={[tw`flex flex-col justify-center items-center`]}>
      <div css={[tw`text-4xl font-extrabold mb-8`]}>Login</div>
      <div css={[tw`w-[15rem]`, tw`mx-auto`, tw`flex flex-col justify-center items-center gap-2`]}>
        <GoogleLoginButton onClick={redirectSSO} />
        {/* <Button type="submit" css={[tw`w-full mt-8`]} onClick={redirectSSO}>
          로그인
        </Button> */}
        {/* <label
          css={[
            tw`flex gap-2`,
            tw`text-sm text-zinc-600 font-bold`,
            tw`cursor-pointer transition-colors`,
          ]}
        >
          <input type="checkbox" onChange={(e) => setRememberMe(e.target.checked)} />
          로그인 저장
        </label> */}
        {/* {message && (
          <div>
            <div>로그인에 실패했습니다.</div>
            <div>{message}</div>
          </div>
        )} */}
      </div>
    </DefaultLayout>
  );
};

export default SSOLogin;
