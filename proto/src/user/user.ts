/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Provider } from "../auth/auth";
import { StringValue } from "../google/protobuf/wrappers";

export interface User {
  id: number;
  name: string;
  email: string;
  providerId: string;
  provider: Provider;
  createdAt: number;
  deletedAt: number;
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  findUserById(request: StringValue): Observable<User>;
}

export interface UserServiceController {
  findUserById(request: StringValue): Promise<User> | Observable<User> | User;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findUserById"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
