import { User as UserSSO } from '@heavyrisem/sso-msa-example-proto';
import { Request } from 'express';

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '../auth.service';

@Injectable()
export class RefreshGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request & { user?: UserSSO } = context.switchToHttp().getRequest();
    const { refreshToken } = this.authService.getTokenFromRequest(request);

    if (!refreshToken) throw new UnauthorizedException('No Auth Token');

    const { value: isValid } = await this.authService.verifyToken(refreshToken);
    if (!isValid) throw new UnauthorizedException('Token Expired');

    return true;
  }
}