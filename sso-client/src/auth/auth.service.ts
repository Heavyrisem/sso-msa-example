import { auth } from '@heavyrisem/sso-msa-example-proto';

import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import { getResultFromObservable } from '~modules/utils/observable.utils';

import { AUTH_PROVIDER, SERVICE_NAME } from './auth.constants';

@Injectable()
export class AuthService implements OnModuleInit {
  private authService: auth.AuthService;

  constructor(@Inject(AUTH_PROVIDER) private client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<auth.AuthService>(SERVICE_NAME);
  }

  generateToken(profile: Required<auth.OAuthProfile>) {
    return getResultFromObservable(this.authService.generateToken(profile));
  }

  verifyToken(token: string) {
    return getResultFromObservable(this.authService.verifyToken({ value: token }));
  }

  getOAuthProfile(oauthRequest: Required<auth.OAuthRequest>) {
    return getResultFromObservable(this.authService.getOAuthProfile(oauthRequest));
  }
}
