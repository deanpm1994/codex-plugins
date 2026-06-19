import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { attachDiagramAssets, exportDiagramToSvg } from "../scripts/diagrams.mjs";

test("diagram assets attach to slide model", () => {
  const slide = { title: "A" };
  const next = attachDiagramAssets(slide, [{ type: "png" }]);
  assert.equal(next.assets.length, 1);
});

test("exportDiagramToSvg writes an svg file", async () => {
  const dir = await mkdtemp(join(tmpdir(), "slideit-"));
  const svgPath = await exportDiagramToSvg({ title: "System flow", slideId: "s1", name: "flow" }, dir);
  const svg = await readFile(svgPath, "utf8");
  assert.match(svg, /System flow/);
});
