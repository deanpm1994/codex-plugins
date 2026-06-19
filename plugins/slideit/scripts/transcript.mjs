import { createTranscriptHints } from "./context.mjs";

function splitTranscriptBlocks(sourceText) {
  return String(sourceText || "")
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);
}

export function extractTranscriptContext(sourceText) {
  const blocks = splitTranscriptBlocks(sourceText);
  const hints = createTranscriptHints(sourceText);
  const summary = blocks.slice(0, 3).join(" ");
  const citations = blocks.slice(0, 5).map((block, index) => ({
    id: `source-${index + 1}`,
    text: block,
  }));
  const candidateSlides = [];

  if (blocks.length > 0) {
    candidateSlides.push({
      type: "summary",
      heading: "Transcript summary",
      body: summary,
    });
  }

  if (hints.includes("decision-heavy")) {
    candidateSlides.push({
      type: "decision",
      heading: "Key decisions",
    });
  }

  return {
    summary,
    citations,
    candidateSlides,
    hints,
  };
}
