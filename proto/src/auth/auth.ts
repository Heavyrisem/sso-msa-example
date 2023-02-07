/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { BoolValue, StringValue } from "../google/protobuf/wrappers";

export const protobufPackage = "auth";

export enum Provider {
  GOOGLE = 0,
  UNRECOGNIZED = -1,
}

export function providerFromJSON(object: any): Provider {
  switch (object) {
    case 0:
    case "GOOGLE":
      return Provider.GOOGLE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Provider.UNRECOGNIZED;
  }
}

export function providerToJSON(object: Provider): string {
  switch (object) {
    case Provider.GOOGLE:
      return "GOOGLE";
    case Provider.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface TokenPayload {
  id: number;
  name: string;
  email: string;
  provider: Provider;
}

export interface OAuthRequest {
  code: string;
  redirect: string;
  callback: string;
  provider: Provider;
}

export interface OAuthProfile {
  provider: Provider;
  providerId: number;
  email: string;
  name: string;
}

export interface OAuthState {
  redirect: string;
  callback: string;
  provider: Provider;
}

function createBaseToken(): Token {
  return { accessToken: "", refreshToken: "" };
}

export const Token = {
  encode(message: Token, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accessToken !== "") {
      writer.uint32(10).string(message.accessToken);
    }
    if (message.refreshToken !== "") {
      writer.uint32(18).string(message.refreshToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Token {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseToken();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accessToken = reader.string();
          break;
        case 2:
          message.refreshToken = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Token {
    return {
      accessToken: isSet(object.accessToken) ? String(object.accessToken) : "",
      refreshToken: isSet(object.refreshToken) ? String(object.refreshToken) : "",
    };
  },

  toJSON(message: Token): unknown {
    const obj: any = {};
    message.accessToken !== undefined && (obj.accessToken = message.accessToken);
    message.refreshToken !== undefined && (obj.refreshToken = message.refreshToken);
    return obj;
  },

  create<I extends Exact<DeepPartial<Token>, I>>(base?: I): Token {
    return Token.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Token>, I>>(object: I): Token {
    const message = createBaseToken();
    message.accessToken = object.accessToken ?? "";
    message.refreshToken = object.refreshToken ?? "";
    return message;
  },
};

function createBaseTokenPayload(): TokenPayload {
  return { id: 0, name: "", email: "", provider: 0 };
}

export const TokenPayload = {
  encode(message: TokenPayload, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint32(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.email !== "") {
      writer.uint32(26).string(message.email);
    }
    if (message.provider !== 0) {
      writer.uint32(32).int32(message.provider);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TokenPayload {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTokenPayload();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint32();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.email = reader.string();
          break;
        case 4:
          message.provider = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TokenPayload {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      name: isSet(object.name) ? String(object.name) : "",
      email: isSet(object.email) ? String(object.email) : "",
      provider: isSet(object.provider) ? providerFromJSON(object.provider) : 0,
    };
  },

  toJSON(message: TokenPayload): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.name !== undefined && (obj.name = message.name);
    message.email !== undefined && (obj.email = message.email);
    message.provider !== undefined && (obj.provider = providerToJSON(message.provider));
    return obj;
  },

  create<I extends Exact<DeepPartial<TokenPayload>, I>>(base?: I): TokenPayload {
    return TokenPayload.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<TokenPayload>, I>>(object: I): TokenPayload {
    const message = createBaseTokenPayload();
    message.id = object.id ?? 0;
    message.name = object.name ?? "";
    message.email = object.email ?? "";
    message.provider = object.provider ?? 0;
    return message;
  },
};

function createBaseOAuthRequest(): OAuthRequest {
  return { code: "", redirect: "", callback: "", provider: 0 };
}

export const OAuthRequest = {
  encode(message: OAuthRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== "") {
      writer.uint32(10).string(message.code);
    }
    if (message.redirect !== "") {
      writer.uint32(18).string(message.redirect);
    }
    if (message.callback !== "") {
      writer.uint32(26).string(message.callback);
    }
    if (message.provider !== 0) {
      writer.uint32(32).int32(message.provider);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OAuthRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOAuthRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.code = reader.string();
          break;
        case 2:
          message.redirect = reader.string();
          break;
        case 3:
          message.callback = reader.string();
          break;
        case 4:
          message.provider = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): OAuthRequest {
    return {
      code: isSet(object.code) ? String(object.code) : "",
      redirect: isSet(object.redirect) ? String(object.redirect) : "",
      callback: isSet(object.callback) ? String(object.callback) : "",
      provider: isSet(object.provider) ? providerFromJSON(object.provider) : 0,
    };
  },

  toJSON(message: OAuthRequest): unknown {
    const obj: any = {};
    message.code !== undefined && (obj.code = message.code);
    message.redirect !== undefined && (obj.redirect = message.redirect);
    message.callback !== undefined && (obj.callback = message.callback);
    message.provider !== undefined && (obj.provider = providerToJSON(message.provider));
    return obj;
  },

  create<I extends Exact<DeepPartial<OAuthRequest>, I>>(base?: I): OAuthRequest {
    return OAuthRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<OAuthRequest>, I>>(object: I): OAuthRequest {
    const message = createBaseOAuthRequest();
    message.code = object.code ?? "";
    message.redirect = object.redirect ?? "";
    message.callback = object.callback ?? "";
    message.provider = object.provider ?? 0;
    return message;
  },
};

function createBaseOAuthProfile(): OAuthProfile {
  return { provider: 0, providerId: 0, email: "", name: "" };
}

export const OAuthProfile = {
  encode(message: OAuthProfile, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.provider !== 0) {
      writer.uint32(8).int32(message.provider);
    }
    if (message.providerId !== 0) {
      writer.uint32(16).uint32(message.providerId);
    }
    if (message.email !== "") {
      writer.uint32(26).string(message.email);
    }
    if (message.name !== "") {
      writer.uint32(34).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OAuthProfile {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOAuthProfile();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.provider = reader.int32() as any;
          break;
        case 2:
          message.providerId = reader.uint32();
          break;
        case 3:
          message.email = reader.string();
          break;
        case 4:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): OAuthProfile {
    return {
      provider: isSet(object.provider) ? providerFromJSON(object.provider) : 0,
      providerId: isSet(object.providerId) ? Number(object.providerId) : 0,
      email: isSet(object.email) ? String(object.email) : "",
      name: isSet(object.name) ? String(object.name) : "",
    };
  },

  toJSON(message: OAuthProfile): unknown {
    const obj: any = {};
    message.provider !== undefined && (obj.provider = providerToJSON(message.provider));
    message.providerId !== undefined && (obj.providerId = Math.round(message.providerId));
    message.email !== undefined && (obj.email = message.email);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  create<I extends Exact<DeepPartial<OAuthProfile>, I>>(base?: I): OAuthProfile {
    return OAuthProfile.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<OAuthProfile>, I>>(object: I): OAuthProfile {
    const message = createBaseOAuthProfile();
    message.provider = object.provider ?? 0;
    message.providerId = object.providerId ?? 0;
    message.email = object.email ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseOAuthState(): OAuthState {
  return { redirect: "", callback: "", provider: 0 };
}

export const OAuthState = {
  encode(message: OAuthState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.redirect !== "") {
      writer.uint32(10).string(message.redirect);
    }
    if (message.callback !== "") {
      writer.uint32(18).string(message.callback);
    }
    if (message.provider !== 0) {
      writer.uint32(24).int32(message.provider);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OAuthState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOAuthState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.redirect = reader.string();
          break;
        case 2:
          message.callback = reader.string();
          break;
        case 3:
          message.provider = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): OAuthState {
    return {
      redirect: isSet(object.redirect) ? String(object.redirect) : "",
      callback: isSet(object.callback) ? String(object.callback) : "",
      provider: isSet(object.provider) ? providerFromJSON(object.provider) : 0,
    };
  },

  toJSON(message: OAuthState): unknown {
    const obj: any = {};
    message.redirect !== undefined && (obj.redirect = message.redirect);
    message.callback !== undefined && (obj.callback = message.callback);
    message.provider !== undefined && (obj.provider = providerToJSON(message.provider));
    return obj;
  },

  create<I extends Exact<DeepPartial<OAuthState>, I>>(base?: I): OAuthState {
    return OAuthState.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<OAuthState>, I>>(object: I): OAuthState {
    const message = createBaseOAuthState();
    message.redirect = object.redirect ?? "";
    message.callback = object.callback ?? "";
    message.provider = object.provider ?? 0;
    return message;
  },
};

export interface AuthService {
  VerifyToken(request: StringValue): Promise<BoolValue>;
  GenerateToken(request: OAuthProfile): Promise<Token>;
  GetOAuthProfile(request: OAuthRequest): Promise<OAuthProfile>;
}

export class AuthServiceClientImpl implements AuthService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "auth.AuthService";
    this.rpc = rpc;
    this.VerifyToken = this.VerifyToken.bind(this);
    this.GenerateToken = this.GenerateToken.bind(this);
    this.GetOAuthProfile = this.GetOAuthProfile.bind(this);
  }
  VerifyToken(request: StringValue): Promise<BoolValue> {
    const data = StringValue.encode(request).finish();
    const promise = this.rpc.request(this.service, "VerifyToken", data);
    return promise.then((data) => BoolValue.decode(new _m0.Reader(data)));
  }

  GenerateToken(request: OAuthProfile): Promise<Token> {
    const data = OAuthProfile.encode(request).finish();
    const promise = this.rpc.request(this.service, "GenerateToken", data);
    return promise.then((data) => Token.decode(new _m0.Reader(data)));
  }

  GetOAuthProfile(request: OAuthRequest): Promise<OAuthProfile> {
    const data = OAuthRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetOAuthProfile", data);
    return promise.then((data) => OAuthProfile.decode(new _m0.Reader(data)));
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
