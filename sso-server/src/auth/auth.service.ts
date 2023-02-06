import { auth } from '@heavyrisem/sso-msa-example-proto';

import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';

import { GoogleStrategy } from './strategy/google.strategy';

@Injectable()
export class AuthService {
  constructor(private readonly googleStrategy: GoogleStrategy) {}

  async getProfile(code: string, redirectUri, provider: auth.PROVIDER) {
    switch (provider) {
      case auth.PROVIDER.GOOGLE:
        return this.googleStrategy.getProfile(code, redirectUri);
      default:
        throw new BadRequestException(`OAuth provider not founded: ${provider}`);
    }
  }
}
