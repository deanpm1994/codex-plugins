import test from "node:test";
import assert from "node:assert/strict";
import { normalizeInput } from "../scripts/context.mjs";

test("normalizeInput defaults to polished output", () => {
  const result = normalizeInput({ title: "Demo" });
  assert.equal(result.tone, "polished");
  assert.equal(result.sourceType, "outline");
  assert.deepEqual(result.transcriptHints, []);
});
