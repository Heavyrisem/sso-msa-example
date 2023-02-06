import { auth } from '@heavyrisem/sso-msa-example-proto';
import { Response } from 'express';

import { BadRequestException, Controller, Get, Query, Res } from '@nestjs/common';

import { createQueryParameter } from '~modules/utils/url.util';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/test')
  async test() {
    const payload = {
      id: 1,
      name: 'name',
      expire: { seconds: 1234 },
    };
    const res = await this.authService.generateToken(payload);
    return res.token;
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

    const { redirect, callback } = JSON.parse(state ?? '{}');
    await this.authService.getOAuthProfile({
      code,
      redirect,
      callback,
      provider: auth.PROVIDER.GOOGLE,
    });
    return res.redirect(redirect);
  }
}
