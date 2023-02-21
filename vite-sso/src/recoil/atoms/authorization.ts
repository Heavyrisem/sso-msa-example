import { atom } from 'recoil';

import { BaseAtom } from '@recoil/atom.interface';
import { localStorageEffect } from '@recoil/utils';
import { setAuthorizationHeader } from '@utils/api/axiosInstance';

const AUTHORIZATION_KEY = 'authorization';

export interface Authorization extends BaseAtom {
  token: string | null;
}

const authorizationState = atom<Authorization>({
  key: 'authorizationState',
  default: { token: null },
  effects: [
    localStorageEffect<Authorization>(AUTHORIZATION_KEY, ({ token }) =>
      setAuthorizationHeader(token),
    ),
    ({ onSet }) => {
      onSet(({ token }) => setAuthorizationHeader(token));
    },
  ],
});

export default authorizationState;
