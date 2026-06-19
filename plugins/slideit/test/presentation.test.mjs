import test from "node:test";
import assert from "node:assert/strict";
import { createPresentation, embedTraceability } from "../scripts/presentation.mjs";

test("embedTraceability adds references and notes", () => {
  const deck = embedTraceability({ title: "Deck" }, {
    summary: "Summary line",
    citations: [{ id: "source-1", text: "A line" }],
  });

  assert.equal(deck.references.length, 1);
  assert.deepEqual(deck.speakerNotes, ["Summary line"]);
});

test("createPresentation includes transcript traceability when provided", () => {
  const presentation = createPresentation({
    title: "Demo",
    transcriptContext: {
      summary: "Summary line",
      citations: [{ id: "source-1", text: "A line" }],
    },
  });

  assert.equal(presentation.model.references.length, 1);
  assert.match(presentation.html, /references/);
});
