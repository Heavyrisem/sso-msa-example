import {
  Provider,
  OAuthProfile,
  Token,
  BoolValue,
  StringValue,
  TokenPayload,
} from '@heavyrisem/sso-msa-example-proto';

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { GoogleStrategy } from './strategy/google.strategy';

@Injectable()
export class AuthService {
  logger = new Logger('AuthService');

  constructor(
    private readonly googleStrategy: GoogleStrategy,
    private readonly jwtService: JwtService,
  ) {}

  async getProfile(code: string, redirectUri: string, provider: Provider) {
    switch (provider) {
      case Provider.GOOGLE:
        return this.googleStrategy.getProfile(code, redirectUri);
      default:
        throw new BadRequestException(`OAuth provider not founded: ${provider}`);
    }
  }

  generateToken(profile: Required<OAuthProfile>): Required<Token> {
    const payload = this.getPayloadFromProfile(profile);

    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '60s' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '4h' }),
    };
  }

  verifyToken(token: StringValue): Required<BoolValue> {
    try {
      this.jwtService.verify(token.value);
      return { value: true };
    } catch (err) {
      this.logger.error(`${err}, ${token.value}`);
      return { value: false };
    }
  }

  private getPayloadFromProfile(profile: Required<OAuthProfile>): Required<TokenPayload> {
    return {
      id: profile.providerId,
      name: profile.name,
      provider: profile.provider,
      email: profile.email,
    };
  }
}
