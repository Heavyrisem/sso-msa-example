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

export const RpcController = (name: string, CustomDecorator: () => ClassDecorator) => {
  return applyDecorators(
    Controller(name),
    UseInterceptors(RpcLoggerInterceptor),
    UseFilters(HttpExceptionFilter),
    UsePipes(new ValidationPipe({ transform: true })),
    CustomDecorator(),
  );
};
