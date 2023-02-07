import { getProtoPath, USER_PACKAGE_NAME } from '@heavyrisem/sso-msa-example-proto';

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigurationModule } from '~modules/config/config.module';
import { DatabaseModule } from '~src/modules/database/database.module';

import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    ConfigurationModule,
    // DatabaseModule,
    // TypeOrmModule.forFeature([User]),
    ClientsModule.register([
      {
        name: USER_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env.MSA_AUTH_HOST,
          package: USER_PACKAGE_NAME,
          protoPath: [getProtoPath('user/user.proto'), getProtoPath('auth/auth.proto')],
        },
      },
    ]),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
