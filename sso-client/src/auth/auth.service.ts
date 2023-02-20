import {
  AuthServiceClient,
  AUTH_PACKAGE_NAME,
  AUTH_SERVICE_NAME,
  BoolValue,
  OAuthRequest,
  Token,
  TokenPayload,
  Shared,
} from '@heavyrisem/sso-msa-example-proto';
import { Request } from 'express';

import { BadRequestException, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import { getResultFromObservable } from '~modules/utils/observable.utils';
import { HandleRpcException } from '~modules/utils/rpc.utils';

import { REFRESH_TOKEN_KEY } from './auth.constants';

@Injectable()
export class AuthService implements OnModuleInit {
  private authService: AuthServiceClient;

  constructor(@Inject(AUTH_PACKAGE_NAME) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  @HandleRpcException
  generateToken(profile: Shared.OAuthProfile): Promise<Token> {
    return getResultFromObservable(this.authService.generateToken(profile));
  }

  @HandleRpcException
  verifyToken(token: string): Promise<BoolValue> {
    throw new Error('Runtime Error');
    return getResultFromObservable(this.authService.verifyToken({ value: token }));
  }

  @HandleRpcException
  getOAuthProfile(oauthRequest: OAuthRequest): Promise<Shared.OAuthProfile> {
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
