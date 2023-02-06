import { auth } from '@heavyrisem/sso-msa-example-proto';
import { NextFunction, Request, Response } from 'express';

import { Injectable, InternalServerErrorException, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '~src/user/user.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = req.cookies['accessToken'];
      if (accessToken) {
        const accessPayload = this.jwtService.decode(accessToken) as auth.TokenPayload;

        if (typeof accessPayload === 'object' && accessPayload['id']) {
          const user = await this.userService.findById(accessPayload.id, {
            relations: ['roleGroup'],
          });
          req['user'] = user;
          req['payload'] = accessPayload;
        }
      }

      next();
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Error With Parsing JWT');
    }
  }
}