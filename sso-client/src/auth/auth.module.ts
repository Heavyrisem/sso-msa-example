import { getProtoPath } from '@heavyrisem/sso-msa-example-proto';

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ConfigurationModule } from '~modules/config/config.module';

import { AUTH_PACKAGE, AUTH_PROVIDER } from './auth.constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigurationModule,
    ClientsModule.register([
      {
        name: AUTH_PROVIDER,
        transport: Transport.GRPC,
        options: {
          url: process.env.MSA_AUTH_URL,
          package: AUTH_PACKAGE,
          protoPath: getProtoPath('auth/auth.proto'),
        },
      },
    ]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
