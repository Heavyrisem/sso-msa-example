import { auth } from '@heavyrisem/sso-msa-example-proto';

export interface GoogleUser extends auth.OAuthProfile {
  provider: auth.PROVIDER.GOOGLE;
}
