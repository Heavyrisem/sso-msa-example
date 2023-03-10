import { Response } from 'express';

import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { createQueryParameter } from '~modules/utils/url.utils';
import { GetUser } from '~src/user/decorator/get-user.decorator';
import { MergedUser } from '~src/user/user.interface';

import { REFRESH_TOKEN_KEY } from './auth.constants';
import { AuthService } from './auth.service';
import { LoggedInGuard } from './guards/logged-in.guard';
import { RefreshGuard } from './guards/refresh.guard';

@Controller('/api/auth')
export class AuthController {
  logger = new Logger(AuthController.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LoggedInGuard)
  @Get('/test')
  async test(@GetUser() user: MergedUser) {
    return user;
  }

  @UseGuards(RefreshGuard)
  @Get('/refresh')
  async refresh(@Res() res: Response, @GetUser() user: MergedUser) {
    this.logger.debug(`Refresh Token For User: ${user?.name}`);
    const { accessToken, refreshToken } = await this.authService.generateToken({ profile: user });

    res.cookie(REFRESH_TOKEN_KEY, `${refreshToken}`, {
      httpOnly: true,
    });
    return res.send({ accessToken });
  }

  @Get('')
  redirectToSSO(
    @Res() res: Response,
    @Query('redirect') redirect?: string,
    @Query('provider') provider?: string,
  ) {
    if (!redirect || !provider) throw new BadRequestException('Some params is empty');
    const params = createQueryParameter({ redirect });
    return res.redirect(`${this.configService.getOrThrow('SSO_URL')}/${provider}?${params}`);
  }

  @Get('/setRefresh')
  async setRefresh(
    @Res() res: Response,
    @Query('refreshToken') refreshToken?: string,
    @Query('redirect') redirect?: string,
  ) {
    if (!refreshToken || !redirect) throw new BadRequestException('Some params is empty');

    const { value: isValid } = await this.authService.verifyToken(refreshToken);
    if (!isValid) throw new BadRequestException('Invalid refresh token');

    res.cookie(REFRESH_TOKEN_KEY, refreshToken, {
      httpOnly: true,
    });
    return res.redirect(redirect);
  }

  // @Get('/callback/:provider')
  // async oauthCallback(
  //   @Res() res: Response,
  //   @Query('code') code?: string,
  //   @Query('state') state?: string,
  // ) {
  //   if (!code) throw new BadRequestException('Code is empty');
  //   if (!state) throw new BadRequestException('State is empty');

  //   const { redirect, callback, provider } = JSON.parse(state ?? '{}') as OAuthState;
  //   console.log(provider);
  //   const profile = await this.authService.getOAuthProfile({
  //     code,
  //     redirect,
  //     callback,
  //     provider,
  //   });
  //   // Cookie, Session ??? ????????? ?????? ??????
  //   console.log(profile);
  //   const token = await this.authService.generateToken(profile);

  //   res.cookie(REFRESH_TOKEN_KEY, `${token.refreshToken}`, {
  //     httpOnly: true,
  //   });
  //   return res.redirect(redirect);
  //   // localhost:3000/auth?redirect=http://localhost:3000/auth/test&callback=http://localhost:3000/auth/callback/google&provider=google
  // }

  @Get('/logout')
  async logout(@Res() res: Response) {
    return res.cookie(REFRESH_TOKEN_KEY, '', { httpOnly: true }).status(200).send();
  }
}
