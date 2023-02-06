import { auth } from '@heavyrisem/sso-msa-example-proto';
import { Response } from 'express';

import { BadRequestException, Controller, Get, Param, Query, Res } from '@nestjs/common';

import { getResultFromObservable } from '~modules/utils/observable.utils';
import { createQueryParameter } from '~modules/utils/url.util';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/test')
  async test(@Query('token') token: string) {
    return this.authService.verifyToken(token);
    // const res = await this.authService.authService.generateToken(payload);
    // return res.token;
  }

  @Get('')
  redirectToSSO(
    @Res() res: Response,
    @Query('redirect') redirect?: string,
    @Query('callback') callback?: string,
    @Query('provider') provider?: string,
  ) {
    if (!redirect || !callback || !provider) throw new BadRequestException('Some params is empty');
    const params = createQueryParameter({ redirect, callback });
    return res.redirect(`${process.env.SSO_URL}/${provider}?${params}`);
  }

  @Get('/callback/:provider')
  async oauthCallback(
    @Res() res: Response,
    @Query('code') code?: string,
    @Query('state') state?: string,
  ) {
    if (!code) throw new BadRequestException('Code is empty');
    if (!state) throw new BadRequestException('State is empty');

    const { redirect, callback, provider } = JSON.parse(state ?? '{}') as auth.OAuthState;
    console.log('redirect', redirect, 'callback', callback);
    const profile = await this.authService.getOAuthProfile({
      code,
      redirect,
      callback,
      provider,
    });
    console.log('profile', profile);
    const token = await this.authService.generateToken(profile);
    console.log('token', token);

    // res.cookie('refreshToken', `Bearer ${token.refreshToken}`, {
    //   httpOnly: true,
    // });
    return res.redirect(redirect);
    // localhost:3000/auth?redirect=http://localhost:3000/auth/test&callback=http://localhost:3000/auth/callback/google&provider=google
  }
}
