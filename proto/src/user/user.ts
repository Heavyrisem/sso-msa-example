/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Provider } from "../auth/auth";
import { Int32Value } from "../google/protobuf/wrappers";

export interface User {
  id: number;
  name: string;
  email: string;
  providerId: number;
  provider: Provider;
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  findUserById(request: Int32Value): Observable<User>;
}

export interface UserServiceController {
  findUserById(request: Int32Value): Promise<User> | Observable<User> | User;
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
