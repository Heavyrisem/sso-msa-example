import { User as UserSSO } from '@heavyrisem/sso-msa-example-proto';

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  return request.user as UserSSO;
});
