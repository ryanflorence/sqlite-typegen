import { test } from "node:test";
import * as assert from "node:assert";
import { singularize } from "./inflect.ts";

test("singularize", () => {
  const testCases: [string, string][] = [
    ["categories", "category"],
    ["Children", "Child"],
    ["mice", "mouse"],
    ["people", "person"],
    ["criteria", "criterion"],
    ["phenomena", "phenomenon"],
    ["syllabi", "syllabus"],
    ["analyses", "analysis"],
    ["series", "series"],
    ["fish", "fish"],
    ["knives", "knife"],
    ["lives", "life"],
    ["boxes", "box"],
    ["quizzes", "quiz"],
    ["matrices", "matrix"],
    ["indices", "index"],
    ["vertices", "vertex"],
    ["movies", "movie"],
    ["databases", "database"],
    ["phases", "phase"],
    ["cases", "case"],
  ];

  for (const [input, expected] of testCases) {
    const result = singularize(input);
    assert.equal(result, expected);
  }
});
