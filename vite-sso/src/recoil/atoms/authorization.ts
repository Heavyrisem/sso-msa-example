import { atom } from 'recoil';

import { BaseAtom } from '@recoil/atom.interface';
import { localStorageEffect } from '@recoil/utils';
import axiosInstance from '@utils/api/axiosInstance';

const AUTHORIZATION_KEY = 'authorization';

export interface Authorization extends BaseAtom {
  token: string | null;
}

const authorizationState = atom<Authorization>({
  key: 'authorizationState',
  default: { token: null },
  effects: [
    ({ node, onSet }) => {
      onSet(({ token }) => {
        console.log('recoil token set', token);
        axiosInstance.defaults.headers.common.Authorization = token ? `Bearer ${token}` : undefined;
      });
    },
    localStorageEffect<Authorization>(AUTHORIZATION_KEY),
  ],
});

export default authorizationState;
