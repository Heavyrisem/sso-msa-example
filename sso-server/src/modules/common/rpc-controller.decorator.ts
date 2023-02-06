import {
  applyDecorators,
  Controller,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { RpcLoggerInterceptor } from '~modules/logging/rcp-logger.interceptor';

import { HttpExceptionFilter } from './exception.filter';

export const RpcController = () => {
  return applyDecorators(
    Controller(),
    // UseInterceptors(RpcLoggerInterceptor),
    UseFilters(HttpExceptionFilter),
    UsePipes(new ValidationPipe({ transform: true })),
  );
};
