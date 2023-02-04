import { take } from 'rxjs';

import { Controller, Get } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('')
  async test() {
    const payload = {
      id: 1,
      name: 'name',
      expire: { seconds: 1234 },
    };
    const res = await this.authService.generateToken(payload);
    return res.token;
  }
}
