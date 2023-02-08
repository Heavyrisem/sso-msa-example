/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { BoolValue, StringValue } from "../google/protobuf/wrappers";

export enum Provider {
  GOOGLE = 0,
  UNRECOGNIZED = -1,
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface TokenPayload {
  id: string;
  name: string;
  email: string;
  provider: Provider;
  iat: number;
  exp: number;
}

export interface OAuthRequest {
  code: string;
  redirect: string;
  callback: string;
  provider: Provider;
}

export interface OAuthProfile {
  provider: Provider;
  providerId: string;
  email: string;
  name: string;
}

export interface OAuthState {
  redirect: string;
  callback: string;
  provider: Provider;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface AuthServiceClient {
  verifyToken(request: StringValue): Observable<BoolValue>;

  generateToken(request: OAuthProfile): Observable<Token>;

  getOAuthProfile(request: OAuthRequest): Observable<OAuthProfile>;
}

export interface AuthServiceController {
  verifyToken(request: StringValue): Promise<BoolValue> | Observable<BoolValue> | BoolValue;

  generateToken(request: OAuthProfile): Promise<Token> | Observable<Token> | Token;

  getOAuthProfile(request: OAuthRequest): Promise<OAuthProfile> | Observable<OAuthProfile> | OAuthProfile;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["verifyToken", "generateToken", "getOAuthProfile"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
