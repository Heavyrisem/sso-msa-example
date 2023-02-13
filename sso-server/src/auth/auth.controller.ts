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

  // @Get('/google')
  // googleAuthRedirect(
  //   @Res() res: Response,
  //   @Query('callback') callback: string,
  //   @Query('redirect') redirect: string,
  // ) {
  //   if (!callback || !redirect) throw new BadRequestException('some param is null');

  //   const state: OAuthState = {
  //     redirect,
  //     callback,
  //     provider: Provider.GOOGLE,
  //   };
  //   const params = createQueryParameter({
  //     state,
  //     response_type: 'code',
  //     redirect_uri: callback,
  //     scope: ['email', 'profile'],
  //     client_id: this.configService.get('GOOGLE_OAUTH_CLIENT_ID'),
  //   });

  //   return res.redirect(
  //     `https://accounts.google.com/o/oauth2/v2/auth?${params}`,
  //     // `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fauth%2Ftoken&scope=email%20profile&client_id=802098188066-e4ees5ajp4dikuj587nm8jpe96e82fnj.apps.googleusercontent.com`
  //     // `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fgoogle%2Ftoken&scope=email%20profile&state=%7B%7D&client_id=980608846279-i1ulvajg1gsdbq0je03ol63csb3ml0cb.apps.googleusercontent.com`,
  //     // `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Ftoken&scope=email%2Cprofile&client_id=980608846279-i1ulvajg1gsdbq0je03ol63csb3ml0cb.apps.googleusercontent.com&state=%7B%22redirect%22%3A%22http%3A%2F%2Flocalhost%3A3000%2Ftest%22%7D`
  //     // `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=localhost%3A3000%2Fauth%2Ftoken&scope=email%2Cprofile&client_id=980608846279-i1ulvajg1gsdbq0je03ol63csb3ml0cb.apps.googleusercontent.com`,
  //   );
  // }

  @Get('/oauth/:provider')
  githubAuthRedirect(
    @Res() res: Response,
    @Query('redirect') redirect: string,
    @Param('provider') providerStr: string,
  ) {
    if (!redirect || !providerStr) throw new BadRequestException('some param is null');
    const provider = Shared.stringToProvider(providerStr);

    const callback = `${process.env.SSO_HOST}/auth/callback/${providerStr}`;
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
    console.log(profile);

    const { refreshToken } = await this.authService.generateToken(profile);
    const params = createQueryParameter({ refreshToken });

    return res.redirect(`${redirect}&${params}`);
    // localhost:3000/auth?redirect=http://localhost:3000/auth/test&callback=http://localhost:3000/auth/callback/google&provider=google
  }

  @Get('/token')
  //   @UseGuards(AuthGuard('google'))
  async OAuthCallback(
    @Query('code') code?: string,
    @Query('state') state?: string,
    // @AuthUser() user: GoogleUser,
  ) {
    if (!code) throw new BadRequestException('code is empty');
    const { redirect, callback, provider } = JSON.parse(state ?? '{}') as OAuthState;
    const profile = await this.authService.getProfile(code, callback, provider);
    // this.authService.getParameterForProvider(Provider.GOOGLE);
    // console.log('profile', profile);

    return profile;
    // if (!redirect) throw new BadRequestException();

    //   const { id, email, name } = await this.userService.findUserByGoogleOrSave(user);
    //   const accessToken = this.authService.createToken(
    //     { id, email, name },
    //     { expiresIn: this.configService.get('ACCESS_EXPIRES_IN') },
    //   );
    //   const refreshToken = this.authService.createToken(
    //     { id, email, name },
    //     { expiresIn: this.configService.get('REFRESH_EXPIRES_IN') },
    //   );

    //   return { accessToken, refreshToken };
  }
}
