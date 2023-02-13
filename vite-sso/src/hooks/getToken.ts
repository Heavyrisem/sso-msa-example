import { useRecoilValue } from 'recoil';

import authorizationState from '@recoil/atoms/authorization';

const useToken = () => {
  const authorization = useRecoilValue(authorizationState);
  console.log('useToken');
  return authorization?.token;
};

export default useToken;
