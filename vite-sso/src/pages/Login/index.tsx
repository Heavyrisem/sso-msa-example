import React from 'react';
import { Navigate } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import userState from '@recoil/atoms/user';

import SSOLogin from './SSOLogin';

// 로그인이 여러 Step인 경우 여기에서 jwt payload를 확인하여 원하는 Step으로 라우팅이 가능함
const Login: React.FC = () => {
  const user = useRecoilValue(userState);

  // if (!user) {
  //   return <BasicLogin />;
  // }
  // if (user && !user.twoFactorAuthenticated) {
  //   return <TwoFactorLogin />;
  // }

  if (!user) {
    return <SSOLogin />;
  }

  return <Navigate to="/" />;
  // return <span onClick={() => navigate('/')}>success</span>;
};

export default Login;
