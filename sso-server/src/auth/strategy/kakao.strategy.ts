import { Provider } from '@heavyrisem/sso-msa-example-proto';

import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-kakao';

import { CustomStrategy, KakaoUser } from '../auth.interface';

@Injectable()
export class KakaoStrategy
  extends PassportStrategy(Strategy, 'kakao')
  implements CustomStrategy<KakaoUser>
{
  params: Record<string, any>;

  constructor(private readonly configService: ConfigService) {
    const params = {
      authorizationURL: 'https://kauth.kakao.com/oauth/authorize',
      clientID: configService.getOrThrow('KAKAO_OAUTH_CLIENT_ID'),
      clientSecret: configService.getOrThrow('KAKAO_OAUTH_CLIENT_SECRET'),
    };

    super(params);
    this.params = params;
  }
  getParameter() {
    return {
      client_id: this.params.clientID,
      response_type: 'code',
    };
  }

  getAuthorizationURL() {
    return this.params.authorizationURL;
  }

  async getProfile(code: string, redirect_uri: string): Promise<KakaoUser> {
    const { accessToken } = await this.getOAuthAccessToken(code, { redirect_uri });
    const profile = await this.getUserProfile(accessToken);
    console.log(profile);
    return {
      provider: Provider.KAKAO,
      providerId: profile.id,
      name: profile.displayName,
      email: profile?._json?.kakao_account?.email ?? null,
      profileImage: profile?._json?.properties?.profile_image ?? null,
    };
  }

  private async getOAuthAccessToken(
    code: string,
    options?: Record<string, any>,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return new Promise((resolve, reject) => {
      const params = {
        grant_type: 'authorization_code',
        ...options,
      };
      this._oauth2.getOAuthAccessToken(code, params, (err, accessToken, refreshToken) => {
        if (err) {
          return reject(
            new HttpException(
              `Fail to get KakaoOAuth AccessToken, response: ${err?.data}`,
              err?.statusCode,
            ),
          );
        }
        resolve({ accessToken, refreshToken });
      });
    });
  }

  private async getUserProfile(accessToken: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userProfile(accessToken, (err, profile) => {
        if (err) return reject(`Fail to get Profile, ${err.name} ${err.message}`);
        resolve(profile);
      });
    });
  }
}
