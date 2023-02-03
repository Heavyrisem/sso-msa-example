import { ClientUnaryCallImpl } from '@grpc/grpc-js/build/src/call';
import {
  AuthService,
  BoolValue,
  IAuthServiceClient,
  Token,
  TokenPayload,
} from '@heavyrisem/sso-msa-example-proto';
import { RpcOptions, UnaryCall } from '@protobuf-ts/runtime-rpc';

import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { CreateTokenDto } from './dto/create-token.dto';
import { VerifyTokenDto } from './dto/verify-token.dto';

class DefaultClass {
  sdf() {}
}

export type ServiceFromDescription<T extends DefaultClass> = {
  [call in keyof T['methods']]: any;
};

@Controller()
export class AuthController implements ServiceClient<IAuthServiceClient> {
  [index: string]: void;
  //   verifyToken(input: Token, options?: RpcOptions): UnaryCall<Token, BoolValue> {
  //     throw new Error('Method not implemented.');
  //   }
  //   generateToken(input: TokenPayload, options?: RpcOptions): UnaryCall<TokenPayload, Token> {
  //     throw new Error('Method not implemented.');
  //   }
  @GrpcMethod('AuthService')
  generateToken(createTokenDto: CreateTokenDto, options?: RpcOptions): UnaryCall<Token, BoolValue> {
    console.log('createTokenDto', createTokenDto);
    return new UnaryCall<Token, BoolValue>();
    // return Token.create({ token: 'sample.token.jwt' });
    // return { token: 'sample.token.jwt' };
  }

  @GrpcMethod('AuthService')
  verifyToken(verifyTokenDto: VerifyTokenDto) {
    console.log('verifyTokenDto', verifyTokenDto);

    return {} as TokenPayload;
  }
}
