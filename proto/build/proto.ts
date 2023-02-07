import { findAllFilesWithExtend } from "./paths";
import { sync } from "cross-spawn";
import { SpawnSyncOptions } from "child_process";
import { join, normalize } from "path";
import fs from "fs";

const execute = (
  command: string,
  args: string[],
  options?: SpawnSyncOptions
) => {
  console.log("Running command:", [command, args.join(" ")].join(" "), options);
  const ps = sync(command, args, options);

  if (ps.error) {
    console.log(ps.error);
    throw ps.error;
  } else if (ps.status !== 0) {
    console.log(ps.output.toString());
    throw new Error(
      `Non-zero Exit Code: ${ps.status}, ${command} ${args.join(" ")}`
    );
  } else {
    return ps;
  }
};

const buildAllProto = () => {
  // const protoFiles = findAllFilesWithExtend(sourcePath, ".proto");
  // protoFiles.forEach((protoPath) => {
  //   const result = execute(
  //     "npx",
  //     [
  //       "protoc",
  //       "--plugin=./node_modules/.bin/protoc-gen-ts_proto",
  //       "--ts_proto_opt=env=browser",
  //       "--ts_out",
  //       "./src",
  //       "--proto_path",
  //       "./src",
  //       normalize(join("./src/", protoPath)),
  //     ],
  //     { cwd: join(__dirname, "..") }
  //   );
  //   if (result.error) console.log(result.stderr.toString());
  // });

  const result = execute("yarn", ["build:protoc"], {
    cwd: join(__dirname, "../src"),
  });
  if (result.error) console.log(result.stderr.toString());

  console.log("Proto Build Finish");
};

const generateProtoTypes = (
  savePath: string,
  sourcePath: string,
  typeName: string
) => {
  const protoFiles = findAllFilesWithExtend(sourcePath, ".proto");
  const typeFiles = findAllFilesWithExtend(sourcePath, ".ts", [
    "index.ts",
    "proto.type.ts",
  ]).map((filePath) => filePath.replace(".ts", "").split("\\").join("/"));

  const typeString = `
export type ${typeName} = '${protoFiles.join("'|'").split("\\").join("/")}';
${typeFiles
  .map(
    (filePath) =>
      `export * as ${filePath.split("/").pop()} from './${filePath}';`
  )
  .join("\n")}
`;
  fs.writeFileSync(savePath, typeString);

  console.log("Types Build Finish");
};

const sourcePath = join(__dirname, "../src/");
const savePath = join(__dirname, "../src/proto.type.ts");
buildAllProto();
generateProtoTypes(savePath, sourcePath, "protos");
