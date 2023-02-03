// @generated by protobuf-ts 2.8.2
// @generated from protobuf file "auth/auth.proto" (package "auth", syntax proto3)
// tslint:disable
import { BoolValue } from "../google/protobuf/wrappers";
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MESSAGE_TYPE } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
import { Timestamp } from "../google/protobuf/timestamp";
/**
 * @generated from protobuf message auth.Token
 */
export interface Token {
    /**
     * @generated from protobuf field: string token = 1;
     */
    token: string;
}
/**
 * @generated from protobuf message auth.TokenPayload
 */
export interface TokenPayload {
    /**
     * @generated from protobuf field: uint32 id = 1;
     */
    id: number;
    /**
     * @generated from protobuf field: string name = 2;
     */
    name: string;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp expire = 3;
     */
    expire?: Timestamp;
}
// @generated message type with reflection information, may provide speed optimized methods
class Token$Type extends MessageType<Token> {
    constructor() {
        super("auth.Token", [
            { no: 1, name: "token", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<Token>): Token {
        const message = { token: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Token>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Token): Token {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string token */ 1:
                    message.token = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: Token, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string token = 1; */
        if (message.token !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.token);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message auth.Token
 */
export const Token = new Token$Type();
// @generated message type with reflection information, may provide speed optimized methods
class TokenPayload$Type extends MessageType<TokenPayload> {
    constructor() {
        super("auth.TokenPayload", [
            { no: 1, name: "id", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 2, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "expire", kind: "message", T: () => Timestamp }
        ]);
    }
    create(value?: PartialMessage<TokenPayload>): TokenPayload {
        const message = { id: 0, name: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<TokenPayload>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: TokenPayload): TokenPayload {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* uint32 id */ 1:
                    message.id = reader.uint32();
                    break;
                case /* string name */ 2:
                    message.name = reader.string();
                    break;
                case /* google.protobuf.Timestamp expire */ 3:
                    message.expire = Timestamp.internalBinaryRead(reader, reader.uint32(), options, message.expire);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: TokenPayload, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* uint32 id = 1; */
        if (message.id !== 0)
            writer.tag(1, WireType.Varint).uint32(message.id);
        /* string name = 2; */
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        /* google.protobuf.Timestamp expire = 3; */
        if (message.expire)
            Timestamp.internalBinaryWrite(message.expire, writer.tag(3, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message auth.TokenPayload
 */
export const TokenPayload = new TokenPayload$Type();
/**
 * @generated ServiceType for protobuf service auth.AuthService
 */
export const AuthService = new ServiceType("auth.AuthService", [
    { name: "VerifyToken", options: {}, I: Token, O: BoolValue },
    { name: "GenerateToken", options: {}, I: TokenPayload, O: Token }
]);
