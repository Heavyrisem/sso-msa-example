import {
  AUTH_PACKAGE_NAME,
  getProtoPath,
  USER_PACKAGE_NAME,
} from '@heavyrisem/sso-msa-example-proto';

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('BootStrap');
  const app = await NestFactory.create(AppModule);
  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:${process.env.MSA_PORT}`,
      protoPath: [getProtoPath('auth/auth.proto'), getProtoPath('user/user.proto')],
      package: [AUTH_PACKAGE_NAME, USER_PACKAGE_NAME],
    },
  });

  await app.startAllMicroservices();
  logger.log(`MicroServices Running on ${process.env.MSA_PORT}`);
  await app.listen(process.env.PORT);
  logger.log(`Nest Running on ${process.env.PORT}`);
}
bootstrap();
