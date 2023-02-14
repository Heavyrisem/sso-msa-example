import React from 'react';

import Loading from '@components/Loading';
import useEffectOnce from '@hooks/useEffectOnce';
import useUser from '@hooks/useUser';

const Auth: React.FC = () => {
  const { ssoLogin } = useUser();

  useEffectOnce(() => {
    console.log('Rendering Auth');

    ssoLogin().then(() => {
      window.location.href = '/';
    });
  });

  return (
    <div>
      <Loading />
    </div>
  );
};

export default Auth;
