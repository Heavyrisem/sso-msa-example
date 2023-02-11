import {
  AuthServiceController,
  OAuthProfile,
  Token,
  StringValue,
  BoolValue,
  AUTH_PACKAGE_NAME,
  AUTH_SERVICE_NAME,
} from '@heavyrisem/sso-msa-example-proto';

import { GrpcMethod } from '@nestjs/microservices';

import { RpcController } from '~modules/common/rpc-controller.decorator';

import { AuthService } from './auth.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { OAuthRequestDto } from './dto/oauth-request.dto';

@RpcController(AUTH_PACKAGE_NAME)
export class AuthRpcController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod(AUTH_SERVICE_NAME)
  verifyToken(token: StringValue): BoolValue {
    return this.authService.verifyToken(token);
  }

  @GrpcMethod(AUTH_SERVICE_NAME)
  generateToken(profile: CreateTokenDto): Token {
    return this.authService.generateToken(profile);
  }

  @GrpcMethod(AUTH_SERVICE_NAME)
  getOAuthProfile({ code, callback, provider }: OAuthRequestDto): Promise<OAuthProfile> {
    return this.authService.getProfile(code, callback, provider);
  }
}
