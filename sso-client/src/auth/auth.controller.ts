import { OAuthState, User as UserSSO } from '@heavyrisem/sso-msa-example-proto';
import { Response } from 'express';

import { BadRequestException, Controller, Get, Query, Res, UseGuards } from '@nestjs/common';

import { createQueryParameter } from '~modules/utils/url.util';
import { GetUser } from '~src/user/decorator/get-user.decorator';

import { AuthService } from './auth.service';
import { LoggedInGuard } from './guards/logged-in.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LoggedInGuard)
  @Get('/test')
  async test(@GetUser() user: UserSSO) {
    return user;
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

    const { redirect, callback, provider } = JSON.parse(state ?? '{}') as OAuthState;
    const profile = await this.authService.getOAuthProfile({
      code,
      redirect,
      callback,
      provider,
    });
    // Cookie, Session 중 원하는 방식 선택

    const token = await this.authService.generateToken(profile);

    res.cookie('accessToken', `${token.refreshToken}`, {
      httpOnly: true,
    });
    res.cookie('refreshToken', `${token.refreshToken}`, {
      httpOnly: true,
    });
    return res.redirect(redirect);
    // localhost:3000/auth?redirect=http://localhost:3000/auth/test&callback=http://localhost:3000/auth/callback/google&provider=google
  }
}
