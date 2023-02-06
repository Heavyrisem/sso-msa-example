import { auth } from '@heavyrisem/sso-msa-example-proto';

export interface GoogleUser extends Required<auth.OAuthProfile> {
  provider: auth.PROVIDER.GOOGLE;
}
