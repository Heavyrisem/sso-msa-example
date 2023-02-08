import React, { useEffect, useMemo } from 'react';

import useUser from '@hooks/useUser';

const Auth: React.FC = () => {
  const { fetchRefreshToken } = useUser();

  useEffect(() => {
    console.log(window.location.search);

    fetchRefreshToken();
  }, [fetchRefreshToken]);

  return <div>Auth</div>;
};

export default Auth;
