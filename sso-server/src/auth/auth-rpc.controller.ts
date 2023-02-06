import { auth, from, google, Metadata, Observable, of } from '@heavyrisem/sso-msa-example-proto';

import { NotFoundException } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { RpcController } from '~modules/common/rpc-controller.decorator';

import { AuthService } from './auth.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { OAuthRequestDto } from './dto/oauth-request.dto';

@RpcController()
export class AuthRpcController implements auth.AuthService {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('AuthService')
  verifyToken(data: auth.Token): Observable<google.protobuf.BoolValue> {
    throw new NotFoundException('Method not implemented.');
  }

  @GrpcMethod('AuthService')
  generateToken(data: CreateTokenDto): Observable<auth.Token> {
    console.log(data);
    return of<auth.Token>({ token: 'sample.token.jwt' });
  }

  @GrpcMethod('AuthService')
  getOAuthProfile({ code, redirect, provider }: OAuthRequestDto): Observable<auth.OAuthProfile> {
    return from(this.authService.getProfile(code, redirect, provider));
  }

  // generateToken(createTokenDto: CreateTokenDto, options?: RpcOptions): UnaryCall<Token, BoolValue> {
  //   console.log('createTokenDto', createTokenDto);
  //   return new UnaryCall<Token, BoolValue>();
  //   // return Token.create({ token: 'sample.token.jwt' });
  //   // return { token: 'sample.token.jwt' };
  // }

  // @GrpcMethod('AuthService')
  // verifyToken(verifyTokenDto: VerifyTokenDto) {
  //   console.log('verifyTokenDto', verifyTokenDto);

  //   return {} as TokenPayload;
  // }
}
