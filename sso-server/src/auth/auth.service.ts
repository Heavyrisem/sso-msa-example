import {
  Provider,
  Shared,
  Token,
  BoolValue,
  StringValue,
  TokenPayload,
  User,
} from '@heavyrisem/sso-msa-example-proto';

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '~src/user/user.service';

import { GithubStrategy } from './strategy/github.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { KakaoStrategy } from './strategy/kakao.strategy';

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name);

  constructor(
    private readonly googleStrategy: GoogleStrategy,
    private readonly githubStrategy: GithubStrategy,
    private readonly kakaoStrategy: KakaoStrategy,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async getProfile(code: string, redirectUri: string, provider: Provider): Promise<User> {
    let profile: Shared.OAuthProfile;

    switch (provider) {
      case Provider.GOOGLE:
        profile = await this.googleStrategy.getProfile(code, redirectUri);
        break;
      case Provider.GITHUB:
        profile = await this.githubStrategy.getProfile(code, redirectUri);
        break;
      case Provider.KAKAO:
        profile = await this.kakaoStrategy.getProfile(code, redirectUri);
        break;
      default:
        throw new BadRequestException(`OAuth provider not founded: ${provider}`);
    }

    return this.userService.findUserOrSave(profile);
  }

  getParameterForProvider(provider: Provider) {
    switch (provider) {
      case Provider.GOOGLE:
        return this.googleStrategy.getParameter();
      case Provider.GITHUB:
        return this.githubStrategy.getParameter();
      case Provider.KAKAO:
        return this.kakaoStrategy.getParameter();
      default:
        throw new BadRequestException(`OAuth provider not founded: ${provider}`);
    }
  }

  getAuthorizationURL(provider: Provider) {
    switch (provider) {
      case Provider.GOOGLE:
        return this.googleStrategy.getAuthorizationURL();
      case Provider.GITHUB:
        return this.githubStrategy.getAuthorizationURL();
      case Provider.KAKAO:
        return this.kakaoStrategy.getAuthorizationURL();
      default:
        throw new BadRequestException(`OAuth provider not founded: ${provider}`);
    }
  }

  generateToken(profile: Shared.OAuthProfile): Token {
    const payload = this.getPayloadFromProfile(profile);
    delete payload.exp;
    delete payload.iat;

    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '5m' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '1h' }),
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

  private getPayloadFromProfile(profile: Shared.OAuthProfile): TokenPayload {
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
