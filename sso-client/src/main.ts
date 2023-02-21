import * as cookieParser from 'cookie-parser';

import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { RpcExceptionFilter } from '~modules/common/rpc-exception.filter';
import { HttpLoggerInterceptor } from '~modules/logging/http-logger.interceptor';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  const PORT = configService.getOrThrow('PORT');

  app.use(cookieParser());
  app.useGlobalInterceptors(new HttpLoggerInterceptor());
  app.useGlobalFilters(new RpcExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(PORT);
}
bootstrap();
