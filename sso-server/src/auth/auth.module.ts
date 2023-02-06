import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ConfigurationModule } from '~modules/config/config.module';

import { AuthRpcController } from './auth-rpc.controller';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategy/google.strategy';

@Module({
  imports: [
    ConfigurationModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, GoogleStrategy],
  controllers: [AuthRpcController, AuthController],
})
export class AuthModule {}
