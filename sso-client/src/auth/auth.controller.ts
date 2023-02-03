import { AuthServiceClient } from '@heavyrisem/sso-msa-example-proto';

import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import { AUTH_PROVIDER, SERVICE_NAME } from './auth.constants';

@Controller('auth')
export class AuthController implements OnModuleInit {
  private authService: AuthServiceClient;

  constructor(@Inject(AUTH_PROVIDER) private client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthServiceClient>(SERVICE_NAME);
  }

  @Get('')
  test() {
    return this.authService.verifyToken({ token: 'test' });
  }
}
