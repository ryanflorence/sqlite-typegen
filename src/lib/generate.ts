import Database from "better-sqlite3";
import { singularize } from "./inflect.ts";

let typeMapping: { [key: string]: string } = {
  INTEGER: "number",
  REAL: "number",
  TEXT: "string",
  BLOB: "Buffer",
  BOOLEAN: "boolean",
  DATETIME: "string",
  TIMESTAMP: "string",
  NUMERIC: "number",
  VARCHAR: "string",
  CHAR: "string",
};

type Table = {
  name: string;
};

type Column = {
  name: string;
  type: string;
  notnull: number;
};

let sql = String.raw;

export function generate(dbPath: string, ns = "SQLiteSchema") {
  let db = new Database(dbPath);

  let output = "// auto-generated from SQLite schema with sqlite-typegen\n\n";
  output += `export namespace ${ns} {\n`;

  let tableQuery = sql`SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'`;
  let tables = db.prepare(tableQuery).all() as Table[];

  for (let table of tables) {
    // ignore internal tables like _migralite
    if (table.name.startsWith("_")) {
      continue;
    }

    // Get column info for each table
    let columns = db
      .prepare(sql`PRAGMA table_info('${table.name}')`)
      .all() as Column[];

    // Start type definition
    output += `  export type ${singularize(table.name)} = {\n`;

    for (let column of columns) {
      let nullable = column.notnull === 0;
      let sqliteType = column.type.toUpperCase().split("(")[0];
      let tsType = typeMapping[sqliteType] || "any";

      // Add column definition with optional modifier if nullable
      output += `    ${column.name}${nullable ? "?" : ""}: ${tsType};\n`;
    }

    output += "  };\n";
  }

  output += "}\n";

  // Close database connection
  db.close();

  return output;
}
