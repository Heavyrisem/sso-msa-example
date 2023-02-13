import { atom } from 'recoil';

import type { Shared } from '@heavyrisem/sso-msa-example-proto';

export interface ServiceUser {
  providerId: Shared.UserSSO['providerId'];
  displayName: string;
}
export type User = Shared.UserSSO & ServiceUser;

const userState = atom<User | null>({
  key: 'userState',
  default: null,
});

export default userState;
