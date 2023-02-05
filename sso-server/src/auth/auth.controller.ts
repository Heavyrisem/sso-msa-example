import { Response } from 'express';

import { BadRequestException, Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

import { createQueryParameter } from '~modules/utils/url.util';
import { UserService } from '~src/user/user.service';

import { GoogleUser } from './auth.interface';
import { AuthUser } from './decorator/auth-user.decorator';
import { GoogleStrategy } from './strategy/google.strategy';

@Controller('auth')
export class AuthController {
  constructor(private readonly configService: ConfigService) {}

  @Get('/google')
  googleAuthRedirect(
    @Res() res: Response,
    @Query('callback') callback: string,
    @Query('redirect') redirect: string,
  ) {
    if (!callback || !redirect) throw new BadRequestException('some param is null');

    const params = createQueryParameter({
      response_type: 'code',
      redirect_uri: callback,
      scope: ['email', 'profile'],
      client_id: this.configService.get('GOOGLE_OAUTH_CLIENT_ID'),
      state: { redirect, callback },
    });

    return res.redirect(
      `https://accounts.google.com/o/oauth2/v2/auth?${params}`,
      // `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fauth%2Ftoken&scope=email%20profile&client_id=802098188066-e4ees5ajp4dikuj587nm8jpe96e82fnj.apps.googleusercontent.com`
      // `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fgoogle%2Ftoken&scope=email%20profile&state=%7B%7D&client_id=980608846279-i1ulvajg1gsdbq0je03ol63csb3ml0cb.apps.googleusercontent.com`,
      // `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Ftoken&scope=email%2Cprofile&client_id=980608846279-i1ulvajg1gsdbq0je03ol63csb3ml0cb.apps.googleusercontent.com&state=%7B%22redirect%22%3A%22http%3A%2F%2Flocalhost%3A3000%2Ftest%22%7D`
      // `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=localhost%3A3000%2Fauth%2Ftoken&scope=email%2Cprofile&client_id=980608846279-i1ulvajg1gsdbq0je03ol63csb3ml0cb.apps.googleusercontent.com`,
    );
  }

  @Get('/token')
  //   @UseGuards(AuthGuard('google'))
  async googleAuthCallback(
    @Query('code') code?: string,
    @Query('state') state?: string,
    // @AuthUser() user: GoogleUser,
  ) {
    if (!code) throw new BadRequestException('code is empty');
    const { redirect } = JSON.parse(state ?? '{}');

    this.googleStrategy._oauth2.getOAuthAccessToken(code);
    return redirect;
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

  @Get('/test')
  @UseGuards(AuthGuard('google'))
  authTest() {
    // return user;
  }
}
