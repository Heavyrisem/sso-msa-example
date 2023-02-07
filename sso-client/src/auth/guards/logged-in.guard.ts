import { User as UserSSO } from '@heavyrisem/sso-msa-example-proto';
import { Request } from 'express';

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '../auth.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request & { user?: UserSSO } = context.switchToHttp().getRequest();
    const accessToken = this.authService.getAccessTokenFromRequest(request);

    if (!accessToken) throw new UnauthorizedException('No Auth Token');

    const { value: isValid } = await this.authService.verifyToken(accessToken);
    if (!isValid) throw new UnauthorizedException('Token Expired');

    console.log(isValid, (request.user.createdAt as unknown as Long).toInt());
    return request.user !== undefined;
  }
}
