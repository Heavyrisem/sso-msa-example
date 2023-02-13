import { Body, Controller, ForbiddenException, Get, Param, Post, UseGuards } from '@nestjs/common';

import { LoggedInGuard } from '~src/auth/guards/logged-in.guard';

import { GetUser } from './decorator/get-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { MergedUser } from './user.interface';
import { UserService } from './user.service';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(LoggedInGuard)
  @Get('/me')
  async me(@GetUser() user?: MergedUser) {
    return { result: user };
  }

  @UseGuards(LoggedInGuard)
  @Post('/:id')
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: string,
    @GetUser() user?: MergedUser,
  ) {
    if (user?.providerId !== id) throw new ForbiddenException('Not allowed');
    return this.userService.updateUser(id, updateUserDto);
  }

  @UseGuards(LoggedInGuard)
  @Get('/test')
  async test(@GetUser() user?: MergedUser) {
    return `${user?.displayName}, You Are Authenticated`;
  }
}
