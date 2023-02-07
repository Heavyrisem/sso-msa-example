import { auth } from '@heavyrisem/sso-msa-example-proto';
import {
  StringValue,
  BoolValue,
} from '@heavyrisem/sso-msa-example-proto/dist/google/protobuf/wrappers';

import { GrpcMethod } from '@nestjs/microservices';

import { RpcController } from '~modules/common/rpc-controller.decorator';
import { promisify } from '~modules/utils/promise.util';

import { AuthService } from './auth.service';
import { OAuthProfileDto } from './dto/create-token.dto';
import { OAuthRequestDto } from './dto/oauth-request.dto';

@RpcController()
export class AuthRpcController implements auth.AuthService {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('AuthService')
  VerifyToken(token: StringValue): Promise<BoolValue> {
    return promisify(() => this.authService.verifyToken(token));
  }

  @GrpcMethod('AuthService')
  GenerateToken(profile: OAuthProfileDto): Promise<auth.Token> {
    return promisify(() => this.authService.generateToken(profile));
  }

  @GrpcMethod('AuthService')
  GetOAuthProfile({ code, callback, provider }: OAuthRequestDto): Promise<auth.OAuthProfile> {
    return this.authService.getProfile(code, callback, provider);
  }
}
