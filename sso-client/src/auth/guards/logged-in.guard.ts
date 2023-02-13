import { Request } from 'express';

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

import { MergedUser } from '~src/user/user.interface';

import { REQUEST_USER } from '../auth.constants';
import { AuthService } from '../auth.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  logger = new Logger(LoggedInGuard.name);

  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request & { [REQUEST_USER]?: MergedUser } = context.switchToHttp().getRequest();
    const { accessToken } = this.authService.getTokenFromRequest(request);

    if (!accessToken) throw new UnauthorizedException('No Auth Token');

    const { value: isValid } = await this.authService.verifyToken(accessToken);
    if (!isValid) throw new UnauthorizedException('TokenExpired');

    return request[REQUEST_USER] !== undefined;
  }
}
