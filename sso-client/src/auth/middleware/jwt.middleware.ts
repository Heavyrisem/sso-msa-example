import { NextFunction, Request, Response } from 'express';

import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

import { UserService } from '~src/user/user.service';

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
      const accessToken = this.authService.getAccessTokenFromRequest(req);
      if (accessToken) {
        const payload = this.authService.getPayload(accessToken);

        if (typeof payload === 'object' && payload['id']) {
          const user = await this.userService.findUserById(payload.id);
          req['user'] = user;
        }
      }
    } catch (err) {
      this.logger.warn(err);
    } finally {
      next();
    }
  }
}
