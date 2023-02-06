import { auth, from, google, Observable, of } from '@heavyrisem/sso-msa-example-proto';

import { GrpcMethod } from '@nestjs/microservices';

import { RpcController } from '~modules/common/rpc-controller.decorator';

import { AuthService } from './auth.service';
import { OAuthProfileDto } from './dto/create-token.dto';
import { OAuthRequestDto } from './dto/oauth-request.dto';

@RpcController()
export class AuthRpcController implements auth.AuthService {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('AuthService')
  verifyToken(token: google.protobuf.StringValue): Observable<google.protobuf.BoolValue> {
    return of<google.protobuf.BoolValue>(this.authService.verifyToken(token));
  }

  @GrpcMethod('AuthService')
  generateToken(profile: OAuthProfileDto): Observable<auth.Token> {
    return of<auth.Token>(this.authService.generateToken(profile));
  }

  @GrpcMethod('AuthService')
  getOAuthProfile({ code, callback, provider }: OAuthRequestDto): Observable<auth.OAuthProfile> {
    return from(this.authService.getProfile(code, callback, provider));
  }
}
