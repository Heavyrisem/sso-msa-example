import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import useUser from '@hooks/useUser';

const Auth: React.FC = () => {
  const { ssoLogin } = useUser();

  useEffect(() => {
    console.log('Rendering Auth');

    ssoLogin().then(() => {
      window.location.href = '/';
    });
  }, [ssoLogin]);

  return <div>Auth</div>;
};

export default Auth;
