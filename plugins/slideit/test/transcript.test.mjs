import test from "node:test";
import assert from "node:assert/strict";
import { extractTranscriptContext } from "../scripts/transcript.mjs";
import { resolveDisclosure } from "../scripts/disclosure.mjs";
import { shouldOfferPresentation } from "../scripts/offer.mjs";

test("extractTranscriptContext creates summary and citations", () => {
  const context = extractTranscriptContext("Line one.\n\nLine two.\n\nLine three.");
  assert.equal(context.summary.includes("Line one"), true);
  assert.equal(context.citations.length, 3);
});

test("ambiguous disclosure asks the user", () => {
  assert.equal(resolveDisclosure({ ambiguity: true }).action, "ask");
});

test("proactive offer triggers for transcript-heavy sessions", () => {
  assert.equal(shouldOfferPresentation({ hasTranscript: true }), true);
});
