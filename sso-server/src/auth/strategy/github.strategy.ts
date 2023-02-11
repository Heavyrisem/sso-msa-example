import { Provider } from '@heavyrisem/sso-msa-example-proto';
import { Strategy } from 'passport-github';

import { HttpException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { CustomStrategy, GithubUser } from '../auth.interface';

interface GithubRawUser {
  id: string;
  displayName: string;
  profileUrl: string;
  photos: { value: string }[];
  provider: string;
  emails: { value: string }[];
}

@Injectable()
export class GithubStrategy
  extends PassportStrategy(Strategy, 'google')
  implements CustomStrategy<GithubUser>
{
  params: Record<string, any>;

  constructor() {
    const params = {
      authorizationURL: 'https://github.com/login/oauth/authorize',
      clientID: process.env.GITHUB_OAUTH_CLIENT_ID,
      clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
      scope: ['read:user', 'user:email'],
    };

    super(params);
    this.params = params;
  }

  getParameter() {
    return {
      client_id: this.params.clientID,
      scope: this.params.scope,
      response_type: 'code',
    };
  }

  getAuthorizationURL() {
    return this.params.authorizationURL;
  }

  parseErrorResponse(body: any, status: number): Error {
    console.log(body, status);
    return super.parseErrorResponse(body, status);
  }

  async getProfile(code: string, redirect_uri: string): Promise<GithubUser> {
    const { accessToken } = await this.getOAuthAccessToken(code, { redirect_uri });
    const profile = await this.getUserProfile(accessToken);

    return {
      provider: Provider.GITHUB,
      providerId: profile.id,
      name: profile.displayName,
      email: profile?.emails?.[0].value,
      profileImage: profile?.photos?.[0]?.value ?? null,
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
              `Fail to get GithubOAuth AccessToken, response: ${err.data}`,
              err.statusCode,
            ),
          );
        }
        resolve({ accessToken, refreshToken });
      });
    });
  }

  private async getUserProfile(accessToken: string): Promise<GithubRawUser> {
    return new Promise((resolve, reject) => {
      this.userProfile(accessToken, (err, profile) => {
        if (err) return reject(`Fail to get Profile, ${err.name} ${err.message}`);
        resolve(profile);
      });
    });
  }
}
