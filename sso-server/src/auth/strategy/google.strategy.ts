import { Request } from 'express';
import { Strategy, Profile } from 'passport-google-oauth20';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { GoogleUser, PROVIDER } from '../auth.interface';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') implements Strategy {
  constructor() {
    super({
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      callbackURL: 'http://localhost:3001/auth/token',
      scope: ['email', 'profile'],
    });
  }

  validate(_accessToken: string, _refreshToken: string, profile: Profile): GoogleUser {
    console.log('TOKEN', _accessToken);
    const { id, name, emails } = profile;

    return {
      provider: PROVIDER.GOOGLE,
      providerId: id,
      name: name.givenName,
      email: emails[0].value,
    };
  }

  parseErrorResponse(body: any, status: number): Error {
    console.log(body, status);
    return super.parseErrorResponse(body, status);
  }

  // authenticate(req: Request, options?: any): void {
  //   const { state } = req.query;
  //   options.state = state;
  //   const parsedState = JSON.parse(state as string);
  //   options.callbackURL = parsedState.callback;
  //   console.log('parsedState', parsedState);
  //   super.authenticate(req, options);
  // }
}
