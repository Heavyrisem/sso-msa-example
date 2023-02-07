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
    console.log(res);
    return JSON.parse(res) as TokenPayload;
  }

  getAccessTokenFromRequest(req: Request): string | null {
    return req.cookies['accessToken'] || null;
    // const [_, accessToken] = req.cookies['accessToken']?.split(' ') || [null, null];
    // console.log(accessToken);
    // return accessToken;
  }
}
