import test from "node:test";
import assert from "node:assert/strict";
import { buildDeckModel } from "../scripts/deck.mjs";
import { renderDeck } from "../scripts/presentation.mjs";

test("buildDeckModel creates a title slide", () => {
  const deck = buildDeckModel({ title: "Demo deck" });
  assert.equal(deck.slides.length, 1);
  assert.equal(deck.slides[0].heading, "Demo deck");
});

test("renderDeck returns html and assets", () => {
  const rendered = renderDeck(buildDeckModel({ title: "Demo deck" }));
  assert.match(rendered.html, /<html lang="en">/);
  assert.deepEqual(rendered.assets, []);
});
