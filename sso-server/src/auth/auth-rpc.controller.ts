import {
  AuthServiceController,
  AuthServiceControllerMethods,
  OAuthProfile,
  Token,
  StringValue,
  BoolValue,
  AUTH_PACKAGE_NAME,
} from '@heavyrisem/sso-msa-example-proto';

import { RpcController } from '~modules/common/rpc-controller.decorator';

import { AuthService } from './auth.service';
import { OAuthProfileDto } from './dto/create-token.dto';
import { OAuthRequestDto } from './dto/oauth-request.dto';

@RpcController(AUTH_PACKAGE_NAME, AuthServiceControllerMethods)
export class AuthRpcController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  verifyToken(token: StringValue): BoolValue {
    return this.authService.verifyToken(token);
  }

  generateToken(profile: OAuthProfileDto): Token {
    return this.authService.generateToken(profile);
  }

  getOAuthProfile({ code, callback, provider }: OAuthRequestDto): Promise<OAuthProfile> {
    return this.authService.getProfile(code, callback, provider);
  }
}
