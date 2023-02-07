/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Provider, providerFromJSON, providerToJSON } from "../auth/auth";
import { Int32Value } from "../google/protobuf/wrappers";

export const protobufPackage = "user";

export interface User {
  id: number;
  name: string;
  email: string;
  providerId: number;
  provider: Provider;
}

function createBaseUser(): User {
  return { id: 0, name: "", email: "", providerId: 0, provider: 0 };
}

export const User = {
  encode(message: User, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.email !== "") {
      writer.uint32(26).string(message.email);
    }
    if (message.providerId !== 0) {
      writer.uint32(32).int32(message.providerId);
    }
    if (message.provider !== 0) {
      writer.uint32(40).int32(message.provider);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): User {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.email = reader.string();
          break;
        case 4:
          message.providerId = reader.int32();
          break;
        case 5:
          message.provider = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): User {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      name: isSet(object.name) ? String(object.name) : "",
      email: isSet(object.email) ? String(object.email) : "",
      providerId: isSet(object.providerId) ? Number(object.providerId) : 0,
      provider: isSet(object.provider) ? providerFromJSON(object.provider) : 0,
    };
  },

  toJSON(message: User): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.name !== undefined && (obj.name = message.name);
    message.email !== undefined && (obj.email = message.email);
    message.providerId !== undefined && (obj.providerId = Math.round(message.providerId));
    message.provider !== undefined && (obj.provider = providerToJSON(message.provider));
    return obj;
  },

  create<I extends Exact<DeepPartial<User>, I>>(base?: I): User {
    return User.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<User>, I>>(object: I): User {
    const message = createBaseUser();
    message.id = object.id ?? 0;
    message.name = object.name ?? "";
    message.email = object.email ?? "";
    message.providerId = object.providerId ?? 0;
    message.provider = object.provider ?? 0;
    return message;
  },
};

export interface UserService {
  FindUserById(request: Int32Value): Promise<User>;
}

export class UserServiceClientImpl implements UserService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "user.UserService";
    this.rpc = rpc;
    this.FindUserById = this.FindUserById.bind(this);
  }
  FindUserById(request: Int32Value): Promise<User> {
    const data = Int32Value.encode(request).finish();
    const promise = this.rpc.request(this.service, "FindUserById", data);
    return promise.then((data) => User.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
