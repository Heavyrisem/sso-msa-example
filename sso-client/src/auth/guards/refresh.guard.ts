import { Shared } from '@heavyrisem/sso-msa-example-proto';
import { Request } from 'express';

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '../auth.service';

@Injectable()
export class RefreshGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request & { user?: Shared.UserSSO } = context.switchToHttp().getRequest();
    const { refreshToken } = this.authService.getTokenFromRequest(request);

    if (!refreshToken) throw new UnauthorizedException('No Refresh Token');

    const { value: isValid } = await this.authService.verifyToken(refreshToken);
    if (!isValid) throw new UnauthorizedException('TokenExpired');

    return true;
  }
}
