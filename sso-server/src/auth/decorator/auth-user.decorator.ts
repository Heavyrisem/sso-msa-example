import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// TODO: Service 단으로 빠져야 함
export const AuthUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  return request.user;
});
