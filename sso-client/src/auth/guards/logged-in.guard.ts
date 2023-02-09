import { User as UserSSO } from '@heavyrisem/sso-msa-example-proto';
import { Request } from 'express';

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from '../auth.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  logger = new Logger(LoggedInGuard.name);

  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request & { user?: UserSSO } = context.switchToHttp().getRequest();
    const { accessToken } = this.authService.getTokenFromRequest(request);

    if (!accessToken) throw new UnauthorizedException('No Auth Token');

    const { value: isValid } = await this.authService.verifyToken(accessToken);
    if (!isValid) throw new UnauthorizedException('TokenExpired');

    return request.user !== undefined;
  }
}
