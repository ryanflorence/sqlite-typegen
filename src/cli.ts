import arg from "arg";
import pc from "picocolors";
import { generate } from "./lib/generate.js";
import fs from "fs";
import { resolve } from "path";
import { highlight } from "cli-highlight";

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

let dbPath = args._[0];
if (!dbPath) {
  console.log(pc.red("Error:"), "Database path is required");
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
  ${pc.cyan("sqlite-typegen")} <db path> [options]

${pc.bold("OPTIONS")}
  -o, --out         Output file path (optional)
  -n, --namespace   Namespace for generated types (optional)
  -h, --help        Print help message
  
${pc.bold("EXAMPLES")}
  ${pc.cyan("sqlite-typegen")} ./database.sqlite
  ${pc.cyan("sqlite-typegen")} ./database.sqlite --out types.ts
  ${pc.cyan("sqlite-typegen")} ./database.sqlite --out types.ts -n DB
`);
}
