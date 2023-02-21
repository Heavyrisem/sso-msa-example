import {
  AUTH_PACKAGE_NAME,
  getProtoPath,
  USER_PACKAGE_NAME,
} from '@heavyrisem/sso-msa-example-proto';

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { HttpLoggerInterceptor } from '~modules/logging/http-logger.interceptor';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('BootStrap');
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  const MSA_PORT = configService.getOrThrow('MSA_PORT');
  const PORT = configService.getOrThrow('PORT');

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:${MSA_PORT}`,
      protoPath: [getProtoPath('auth/auth.proto'), getProtoPath('user/user.proto')],
      package: [AUTH_PACKAGE_NAME, USER_PACKAGE_NAME],
    },
  });

  app.useGlobalInterceptors(new HttpLoggerInterceptor());

  await app.startAllMicroservices();
  logger.log(`MicroServices Running on ${MSA_PORT}`);
  await app.listen(PORT);
  logger.log(`Nest Running on ${PORT}`);
}
bootstrap();
