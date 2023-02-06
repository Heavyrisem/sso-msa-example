import { profileEnd } from 'console';

import { auth, google } from '@heavyrisem/sso-msa-example-proto';

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { GoogleStrategy } from './strategy/google.strategy';

@Injectable()
export class AuthService {
  logger = new Logger('AuthService');

  constructor(
    private readonly googleStrategy: GoogleStrategy,
    private readonly jwtService: JwtService,
  ) {}

  async getProfile(code: string, redirectUri, provider: auth.PROVIDER) {
    switch (provider) {
      case auth.PROVIDER.GOOGLE:
        return this.googleStrategy.getProfile(code, redirectUri);
      default:
        throw new BadRequestException(`OAuth provider not founded: ${provider}`);
    }
  }

  generateToken(profile: Required<auth.OAuthProfile>): Required<auth.Token> {
    const payload = this.getPayloadFromProfile(profile);

    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '60s' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '4h' }),
    };
  }

  verifyToken(token: google.protobuf.StringValue): Required<google.protobuf.BoolValue> {
    try {
      this.jwtService.verify(token.value);
      return { value: true };
    } catch (err) {
      this.logger.error(`${err}, ${token.value}`);
      return { value: false };
    }
  }

  private getPayloadFromProfile(profile: Required<auth.OAuthProfile>): Required<auth.TokenPayload> {
    return {
      id: profile.providerId,
      name: profile.name,
      provider: profile.provider,
    };
  }
}
