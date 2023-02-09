import { OAuthState, User as UserSSO } from '@heavyrisem/sso-msa-example-proto';
import { Response } from 'express';

import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';

import { createQueryParameter } from '~modules/utils/url.util';
import { GetUser } from '~src/user/decorator/get-user.decorator';

import { REFRESH_TOKEN_KEY } from './auth.constants';
import { AuthService } from './auth.service';
import { LoggedInGuard } from './guards/logged-in.guard';
import { RefreshGuard } from './guards/refresh.guard';

@Controller('/api/auth')
export class AuthController {
  logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @UseGuards(LoggedInGuard)
  @Get('/test')
  async test(@GetUser() user: UserSSO) {
    return user;
  }

  @UseGuards(RefreshGuard)
  @Get('/refresh')
  async refresh(@Res() res: Response, @GetUser() user: UserSSO) {
    this.logger.debug(`Refresh Token For User: ${user.name}`);
    const { accessToken, refreshToken } = await this.authService.generateToken(user);

    res.cookie(REFRESH_TOKEN_KEY, `${refreshToken}`, {
      httpOnly: true,
    });
    res.send({ accessToken });
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

    res.cookie(REFRESH_TOKEN_KEY, `${token.refreshToken}`, {
      httpOnly: true,
    });
    return res.redirect(redirect);
    // localhost:3000/auth?redirect=http://localhost:3000/auth/test&callback=http://localhost:3000/auth/callback/google&provider=google
  }

  @Get('/logout')
  async logout(@Res() res: Response) {
    return res.cookie(REFRESH_TOKEN_KEY, '', { httpOnly: true }).status(200).send();
  }
}
