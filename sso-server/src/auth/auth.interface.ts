import { Provider, OAuthProfile } from '@heavyrisem/sso-msa-example-proto';
import { Strategy } from 'passport-oauth2';

export interface GoogleUser extends OAuthProfile {
  provider: Provider.GOOGLE;
}

export interface GithubUser extends OAuthProfile {
  provider: Provider.GITHUB;
}

export interface KakaoUser extends OAuthProfile {
  provider: Provider.KAKAO;
}

export declare class CustomStrategy<T> extends Strategy {
  params: Record<string, any>;

  getParameter(): Record<string, any>;
  getAuthorizationURL(): string;
  getProfile(code: string, redirect_uri: string): Promise<T>;
}

// export declare class BaseStrategy<T, U = Strategy> implements CustomStrategy<T>, U {
//   params: Record<string, any>;
//   getParameter(): Record<string, any>;
//   getAuthorizationURL(): string;
//   getProfile(code: string, redirect_uri: string): Promise<T>;
// }
