import { AUTH_PACKAGE_NAME, getProtoPath } from '@heavyrisem/sso-msa-example-proto';

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ConfigurationModule } from '~modules/config/config.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigurationModule,
    ClientsModule.register([
      {
        name: AUTH_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env.MSA_AUTH_HOST,
          package: AUTH_PACKAGE_NAME,
          protoPath: getProtoPath('auth/auth.proto'),
        },
      },
    ]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
