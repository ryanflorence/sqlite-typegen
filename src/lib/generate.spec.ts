import { test } from "node:test";
import Database from "better-sqlite3";
import * as assert from "node:assert";
import { generate } from "./generate.js";
import fs from "node:fs";

test("outputs types", () => {
  let db = new Database("tmp.db");
  db.prepare(
    `
    CREATE TABLE test (
      id INTEGER PRIMARY KEY,
      real REAL,
      text TEXT,
      blob BLOB,
      boolean BOOLEAN,
      datetime DATETIME,
      numeric NUMERIC,
      varchar VARCHAR(255),
      char CHAR(255)
    )`,
  ).run();

  db.prepare(
    `
    CREATE TABLE posts (
      id INTEGER PRIMARY KEY,
      title TEXT,
      body TEXT,
      user_id INTEGER,
      created_at DATETIME
    )`,
  ).run();

  let output = generate("tmp.db");
  assert.equal(
    `// auto-generated from SQLite schema with sqlite-typegen

export type DB = {
  test: {
    id?: number;
    real?: number;
    text?: string;
    blob?: Buffer;
    boolean?: boolean;
    datetime?: Date;
    numeric?: number;
    varchar?: string;
    char?: string;
  };
  posts: {
    id?: number;
    title?: string;
    body?: string;
    user_id?: number;
    created_at?: Date;
  };
};
`,
    output,
  );

  db.close();
  fs.unlinkSync("tmp.db");
});
