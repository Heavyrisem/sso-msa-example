import path from "path";
import { protos } from "./proto.type";

export const getProtoPath = (protoPath: protos): string => {
  return path.resolve(__dirname, protoPath);
};

export * from "./proto.type";
