import React from 'react';
import { Navigate } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import userState from '@recoil/atoms/user';

import BasicLogin from './BasicLogin';
import GoogleLogin from './GoogleLogin';
import TwoFactorLogin from './TwoFactorLogin';

const Login: React.FC = () => {
  const user = useRecoilValue(userState);

  // if (!user) {
  //   return <BasicLogin />;
  // }
  // if (user && !user.twoFactorAuthenticated) {
  //   return <TwoFactorLogin />;
  // }

  if (!user) {
    return <GoogleLogin />;
  }

  return <Navigate to="/" />;
  // return <span onClick={() => navigate('/')}>success</span>;
};

export default Login;
