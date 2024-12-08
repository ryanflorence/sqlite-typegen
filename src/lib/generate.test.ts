import { test, after } from "node:test";
import Database from "better-sqlite3";
import * as assert from "node:assert";
import { generate } from "./generate.ts";
import fs from "node:fs";

after(() => {
  fs.unlinkSync("tmp.db");
});

test("outputs types", () => {
  let db = new Database("tmp.db");
  db.prepare(
    `
    CREATE TABLE tests (
      id INTEGER PRIMARY KEY,
      real REAL,
      text TEXT,
      blob BLOB,
      boolean BOOLEAN,
      datetime DATETIME,
      timestamp TIMESTAMP,
      numeric NUMERIC,
      varchar VARCHAR(255),
      char CHAR(255)
    )`,
  ).run();

  db.prepare(
    `
    CREATE TABLE posts (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT,
      body TEXT,
      user_id INTEGER,
      created_at DATETIME
      updated_at TIMESTAMP
    )`,
  ).run();

  let output = generate("tmp.db");
  assert.equal(
    `// auto-generated from SQLite schema with sqlite-typegen

export namespace SQLiteSchema {
  export type test = {
    id?: number;
    real?: number;
    text?: string;
    blob?: Buffer;
    boolean?: boolean;
    datetime?: string;
    timestamp?: string;
    numeric?: number;
    varchar?: string;
    char?: string;
  };
  export type post = {
    id: number;
    title?: string;
    body?: string;
    user_id?: number;
    created_at?: any;
  };
}`,
    output.trim(),
  );
});
