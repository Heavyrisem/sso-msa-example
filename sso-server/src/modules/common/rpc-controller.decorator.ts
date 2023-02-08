import {
  applyDecorators,
  Controller,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { RpcLoggerInterceptor } from '~modules/logging/rcp-logger.interceptor';

import { RpcExceptionFilter } from './rpc-exception.filter';

export const RpcController = (name: string, CustomDecorator: () => ClassDecorator) => {
  return applyDecorators(
    Controller(name),
    UseInterceptors(RpcLoggerInterceptor),
    UseFilters(RpcExceptionFilter),
    UsePipes(new ValidationPipe({ transform: true })),
    CustomDecorator(),
  );
};
