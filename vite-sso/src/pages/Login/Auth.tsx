import React from 'react';

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

  return <div>Auth</div>;
};

export default Auth;
