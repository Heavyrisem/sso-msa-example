import { User as UserSSO } from '@heavyrisem/sso-msa-example-proto';

import { Controller, Get, UseGuards } from '@nestjs/common';

import { LoggedInGuard } from '~src/auth/guards/logged-in.guard';

import { GetUser } from './decorator/get-user.decorator';

@Controller('/api/user')
export class UserController {
  @UseGuards(LoggedInGuard)
  @Get('/me')
  async me(@GetUser() user: UserSSO) {
    return user;
  }
}
