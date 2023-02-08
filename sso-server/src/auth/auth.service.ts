import {
  Provider,
  OAuthProfile,
  Token,
  BoolValue,
  StringValue,
  TokenPayload,
  User,
} from '@heavyrisem/sso-msa-example-proto';

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '~src/user/user.service';

import { GoogleStrategy } from './strategy/google.strategy';

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name);

  constructor(
    private readonly googleStrategy: GoogleStrategy,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async getProfile(code: string, redirectUri: string, provider: Provider): Promise<User> {
    let profile: OAuthProfile;

    switch (provider) {
      case Provider.GOOGLE:
        profile = await this.googleStrategy.getProfile(code, redirectUri);
        break;
      default:
        throw new BadRequestException(`OAuth provider not founded: ${provider}`);
    }

    return this.userService.findUserOrSave(profile);
  }

  generateToken(profile: OAuthProfile): Token {
    const payload = this.getPayloadFromProfile(profile);
    delete payload.exp;
    delete payload.iat;

    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '1h' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '4h' }),
    };
  }

  verifyToken(token: StringValue): BoolValue {
    try {
      this.jwtService.verify(token.value);
      return { value: true };
    } catch (err) {
      this.logger.warn(`${err}, ${token.value}`);
      return { value: false };
    }
  }

  private getPayloadFromProfile(profile: OAuthProfile): TokenPayload {
    return {
      id: profile.providerId,
      name: profile.name,
      provider: profile.provider,
      email: profile.email,
      iat: 0,
      exp: 0,
    };
  }
}
