import { auth } from '@heavyrisem/sso-msa-example-proto';

import { BadRequestException, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import { AUTH_PROVIDER, SERVICE_NAME } from './auth.constants';

@Injectable()
export class AuthService implements OnModuleInit {
  private authService: auth.AuthService;

  constructor(@Inject(AUTH_PROVIDER) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<auth.AuthService>(SERVICE_NAME);
  }

  generateToken(profile: auth.OAuthProfile) {
    return this.authService.GenerateToken(profile);
  }

  verifyToken(token: string) {
    return this.authService.VerifyToken({ value: token });
  }

  getOAuthProfile(oauthRequest: auth.OAuthRequest) {
    return this.authService.GetOAuthProfile(oauthRequest);
  }

  getPayload(token: string): Required<auth.TokenPayload> {
    const [_, payload] = token.split('.');
    if (!payload) throw new BadRequestException('Invalid Token');
    const res = Buffer.from(payload, 'base64').toString();
    console.log(res);
    return JSON.parse(res) as Required<auth.TokenPayload>;
  }
}
