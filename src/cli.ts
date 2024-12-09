import arg from "arg";
import pc from "picocolors";
import fs from "fs";
import { resolve } from "path";
import { highlight } from "cli-highlight";
import { generate } from "./lib/generate.ts";

let args = arg({
  "--help": Boolean,
  "-h": "--help",
  "--out": String,
  "-o": "--out",
  "--namespace": String,
  "-n": "--namespace",
});

if (args["--help"]) {
  printUsage();
  process.exit(0);
}

let dbPath = process.env.DB_PATH;
if (!dbPath) {
  console.log(pc.red("Error:"), "DB_PATH env variable is not set");
  printUsage();
  process.exit(1);
}

dbPath = resolve(dbPath);

let types = generate(dbPath, args["--namespace"]);

if (args["--out"]) {
  let outPath = resolve(args["--out"]);
  fs.writeFileSync(resolve(outPath), types, "utf-8");
  console.log(pc.green("✔"), `Types written to ${pc.cyan(outPath)}`);
} else {
  console.log(highlight(types, { language: "typescript" }));
}

function printUsage() {
  console.log(`
${pc.bold("USAGE")}
  ${pc.cyan("sqlite-typegen")} [options]

${pc.bold("ENVIRONMENT VARIABLES")}
  ${pc.yellow("DB_PATH")}  Path to SQLite database file

${pc.bold("OPTIONS")}
  -o, --out         Output file path (optional)
  -n, --namespace   Namespace for generated types (optional)
  -h, --help        Print help message
  
${pc.bold("EXAMPLES")}
  ${pc.cyan("sqlite-typegen")}
  ${pc.cyan("sqlite-typegen")} --out types.ts
  ${pc.cyan("sqlite-typegen")} --out types.ts -n DB
`);
}
