import {
  AuthServiceClient,
  BoolValue,
  OAuthProfile,
  OAuthRequest,
  Token,
  TokenPayload,
} from '@heavyrisem/sso-msa-example-proto';

import { BadRequestException, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import { getResultFromObservable } from '~modules/utils/observable.utils';

import { AUTH_PROVIDER, SERVICE_NAME } from './auth.constants';

@Injectable()
export class AuthService implements OnModuleInit {
  private authService: AuthServiceClient;

  constructor(@Inject(AUTH_PROVIDER) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthServiceClient>(SERVICE_NAME);
  }

  generateToken(profile: OAuthProfile): Promise<Token> {
    return getResultFromObservable(this.authService.generateToken(profile));
  }

  verifyToken(token: string): Promise<BoolValue> {
    return getResultFromObservable(this.authService.verifyToken({ value: token }));
  }

  getOAuthProfile(oauthRequest: OAuthRequest): Promise<OAuthProfile> {
    return getResultFromObservable(this.authService.getOAuthProfile(oauthRequest));
  }

  getPayload(token: string): TokenPayload {
    const [_, payload] = token.split('.');
    if (!payload) throw new BadRequestException('Invalid Token');
    const res = Buffer.from(payload, 'base64').toString();
    console.log(res);
    return JSON.parse(res) as TokenPayload;
  }
}
