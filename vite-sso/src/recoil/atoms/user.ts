import { atom } from 'recoil';

import type { User as UserSSO } from '@heavyrisem/sso-msa-example-proto';

export interface User extends UserSSO {
  // id: number;
  // name: string;
  // email: string;
  // roleGroup: {
  //   name: string;
  //   description: string;
  //   roles: Role[];
  // };
  // twoFactorAuthenticated: boolean;
}

const userState = atom<User | null>({
  key: 'userState',
  default: null,
});

export default userState;
