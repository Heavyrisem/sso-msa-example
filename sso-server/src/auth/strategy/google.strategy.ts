import { Provider } from '@heavyrisem/sso-msa-example-proto';
import { Strategy, Profile } from 'passport-google-oauth20';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { GoogleUser } from '../auth.interface';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') implements Strategy {
  constructor() {
    super({
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      scope: ['email', 'profile'],
    });
  }

  parseErrorResponse(body: any, status: number): Error {
    console.log(body, status);
    return super.parseErrorResponse(body, status);
  }

  async getProfile(code: string, redirect_uri: string): Promise<GoogleUser> {
    const { accessToken } = await this.getOAuthAccessToken(code, { redirect_uri });
    const profile = await this.getUserProfile(accessToken);
    return {
      provider: Provider.GOOGLE,
      providerId: profile.id,
      name: profile.name.givenName,
      email: profile.emails[0].value,
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
        if (err)
          return reject(
            `Fail to get AccessToken, status: ${err.statusCode}, response: ${err.data}`,
          );
        resolve({ accessToken, refreshToken });
      });
    });
  }

  private async getUserProfile(accessToken: string): Promise<Profile> {
    return new Promise((resolve, reject) => {
      this.userProfile(accessToken, (err, profile) => {
        if (err) return reject(`Fail to get Profile, ${err.name} ${err.message}`);
        resolve(profile);
      });
    });
  }
}
