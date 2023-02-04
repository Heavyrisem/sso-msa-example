import { applyDecorators, Controller, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';

import { HttpExceptionFilter } from './exception.filter';

export const RpcController = () => {
  return applyDecorators(
    Controller(),
    UseFilters(HttpExceptionFilter),
    UsePipes(new ValidationPipe({ transform: true })),
  );
};
