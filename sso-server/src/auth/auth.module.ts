import { Module } from '@nestjs/common';

import { AuthRpcController } from './auth-rpc.controller';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategy/google.strategy';

@Module({
  providers: [AuthService, GoogleStrategy],
  controllers: [AuthRpcController, AuthController],
})
export class AuthModule {}
