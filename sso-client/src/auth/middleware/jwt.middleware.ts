import { NextFunction, Request, Response } from 'express';

import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

import { UserService } from '~src/user/user.service';

import { REQUEST_USER } from '../auth.constants';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  logger = new Logger(JwtMiddleware.name);

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const { accessToken, refreshToken } = this.authService.getTokenFromRequest(req);
      if (accessToken || refreshToken) {
        const payload = this.authService.getPayload(accessToken || refreshToken);

        if (typeof payload === 'object' && payload['id']) {
          const ssoUser = await this.userService.findSSOUserById(payload.id);
          let serviceUser = await this.userService.findUserById(payload.id);
          if (!serviceUser) {
            serviceUser = await this.userService.createUser({
              providerId: payload.id,
              displayName: payload.name,
            });
            this.logger.log(
              `Created service user ${serviceUser.displayName}, ${serviceUser.providerId}`,
            );
          }

          req[REQUEST_USER] = this.userService.mergeUserData(ssoUser, serviceUser);
        }
      }
    } catch (err) {
      this.logger.warn(err);
    } finally {
      next();
    }
  }
}
