import { Provider, OAuthProfile } from '@heavyrisem/sso-msa-example-proto';

export interface GoogleUser extends OAuthProfile {
  provider: Provider.GOOGLE;
}
