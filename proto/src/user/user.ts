/* eslint-disable */
import { Observable } from "rxjs";
import { Provider } from "../auth/auth";
import { StringValue } from "../google/protobuf/wrappers";

export interface User {
  id: number;
  name: string;
  email: string;
  profileImage: string;
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

export const USER_SERVICE_NAME = "UserService";
