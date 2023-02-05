import { auth, google, Observable, of } from '@heavyrisem/sso-msa-example-proto';

import { NotFoundException } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { RpcController } from '~modules/common/rpc-controller.decorator';

import { CreateTokenDto } from './dto/create-token.dto';
import { VerifyTokenDto } from './dto/verify-token.dto';

@RpcController()
export class AuthRpcController {
  @GrpcMethod('AuthService')
  verifyToken(data: auth.Token): Observable<google.protobuf.BoolValue> {
    throw new NotFoundException('Method not implemented.');
  }

  @GrpcMethod('AuthService')
  generateToken(data: CreateTokenDto): Observable<auth.Token> {
    console.log(data);
    return of<auth.Token>({ token: 'sample.token.jwt' });
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
