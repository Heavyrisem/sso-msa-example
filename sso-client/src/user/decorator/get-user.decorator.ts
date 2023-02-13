import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { REQUEST_USER } from '~src/auth/auth.constants';

import { MergedUser } from '../user.interface';

export const GetUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  return request[REQUEST_USER] as MergedUser | undefined;
});
