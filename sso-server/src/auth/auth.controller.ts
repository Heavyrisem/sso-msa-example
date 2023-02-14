import { OAuthState, Shared } from '@heavyrisem/sso-msa-example-proto';
import { Response } from 'express';

import { BadRequestException, Controller, Get, Param, Query, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { createQueryParameter } from '~modules/utils/url.util';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @Get('/oauth/:provider')
  githubAuthRedirect(
    @Res() res: Response,
    @Query('redirect') redirect: string,
    @Param('provider') providerStr: string,
  ) {
    if (!redirect || !providerStr) throw new BadRequestException('some param is null');
    const provider = Shared.stringToProvider(providerStr);

    const callback = `${this.configService.getOrThrow('SSO_HOST')}/auth/callback/${providerStr}`;
    const params = createQueryParameter({
      state: {
        redirect,
        callback,
        provider,
      },
      redirect_uri: callback,
      ...this.authService.getParameterForProvider(provider),
    });

    return res.redirect(`${this.authService.getAuthorizationURL(provider)}?${params}`);
    // http://localhost:3001/auth/github?redirect=http://localhost:3001&callback=http://localhost:3001/auth/github/token
  }

  @Get('/callback/:provider')
  async oauthCallback(
    @Res() res: Response,
    @Query('code') code?: string,
    @Query('state') state?: string,
  ) {
    if (!code) throw new BadRequestException('Code is empty');
    if (!state) throw new BadRequestException('State is empty');

    const { redirect, callback, provider } = JSON.parse(state ?? '{}') as OAuthState;
    const profile = await this.authService.getProfile(code, callback, provider);

    const { refreshToken } = await this.authService.generateToken(profile);
    const params = createQueryParameter({ refreshToken });

    return res.redirect(`${redirect}&${params}`);
    // localhost:3000/auth?redirect=http://localhost:3000/auth/test&callback=http://localhost:3000/auth/callback/google&provider=google
  }
}
