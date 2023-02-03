import { auth, google, Metadata, Observable, of } from '@heavyrisem/sso-msa-example-proto';

import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { CreateTokenDto } from './dto/create-token.dto';
import { VerifyTokenDto } from './dto/verify-token.dto';

@Controller()
export class AuthController implements auth.AuthService {
  @GrpcMethod('AuthService')
  verifyToken(data: auth.Token): Observable<google.protobuf.BoolValue> {
    throw new Error('Method not implemented.');
  }
  //   verifyToken(input: Token, options?: RpcOptions): UnaryCall<Token, BoolValue> {
  //     throw new Error('Method not implemented.');
  //   }
  //   generateToken(input: TokenPayload, options?: RpcOptions): UnaryCall<TokenPayload, Token> {
  //     throw new Error('Method not implemented.');
  //   }
  @GrpcMethod('AuthService')
  generateToken(data: auth.TokenPayload): Observable<auth.Token> {
    return of<auth.Token>({ token: 'asdf' });
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
