import {
  AuthServiceClient,
  AUTH_PACKAGE_NAME,
  AUTH_SERVICE_NAME,
  BoolValue,
  OAuthProfile,
  OAuthRequest,
  Token,
  TokenPayload,
} from '@heavyrisem/sso-msa-example-proto';
import { Request } from 'express';

import { BadRequestException, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import { getResultFromObservable } from '~modules/utils/observable.utils';

import { REFRESH_TOKEN_KEY } from './auth.constants';

@Injectable()
export class AuthService implements OnModuleInit {
  private authService: AuthServiceClient;

  constructor(@Inject(AUTH_PACKAGE_NAME) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
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
    return JSON.parse(res) as TokenPayload;
  }

  getTokenFromRequest(req: Request): Partial<Token> {
    const accessToken = req.headers['authorization']?.split(' ')?.[1];

    return {
      accessToken: accessToken || null,
      refreshToken: req.cookies[REFRESH_TOKEN_KEY] || null,
    };
  }
}
