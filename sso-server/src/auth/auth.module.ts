import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ConfigurationModule } from '~modules/config/config.module';
import { UserModule } from '~src/user/user.module';

import { AuthRpcController } from './auth-rpc.controller';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GithubStrategy } from './strategy/github.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { KakaoStrategy } from './strategy/kakao.strategy';

@Module({
  imports: [
    ConfigurationModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    UserModule,
  ],
  providers: [AuthService, GoogleStrategy, GithubStrategy, KakaoStrategy],
  controllers: [AuthRpcController, AuthController],
})
export class AuthModule {}
