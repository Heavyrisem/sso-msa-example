import * as cookieParser from 'cookie-parser';

import { NestFactory } from '@nestjs/core';

import { RpcExceptionFilter } from '~modules/common/rpc-exception.filter';
import { HttpLoggerInterceptor } from '~modules/logging/http-logger.interceptor';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.useGlobalFilters(new RpcExceptionFilter());
  app.useGlobalInterceptors(new HttpLoggerInterceptor());

  await app.listen(process.env.PORT);
}
bootstrap();
