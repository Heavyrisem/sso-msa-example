import { selector } from 'recoil';

import type { TokenPayload } from '@heavyrisem/sso-msa-example-proto';
import authorizationState from '@recoil/atoms/authorization';

const jwtSelector = selector<TokenPayload | null>({
  key: 'jwtSelector',
  get: ({ get }) => {
    const { token } = get(authorizationState);
    if (!token) return null;

    const [_, payload] = token.split('.');
    const parsed = JSON.parse(window.atob(payload)) as TokenPayload;
    parsed.exp = +`${parsed.exp}` * 1000;
    parsed.iat = +`${parsed.iat}` * 1000;
    return parsed;
  },
});

export default jwtSelector;
