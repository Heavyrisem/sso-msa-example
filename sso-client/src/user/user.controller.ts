import { Shared } from '@heavyrisem/sso-msa-example-proto';

import { Controller, Get, UseGuards } from '@nestjs/common';

import { LoggedInGuard } from '~src/auth/guards/logged-in.guard';

import { GetUser } from './decorator/get-user.decorator';

@Controller('/api/user')
export class UserController {
  @UseGuards(LoggedInGuard)
  @Get('/me')
  async me(@GetUser() user: Shared.UserSSO) {
    return { result: user };
  }

  @UseGuards(LoggedInGuard)
  @Get('/test')
  async test(@GetUser() user: Shared.UserSSO) {
    return `${user.name}, You Are Authenticated`;
  }
}
