import { normalizeInput, createTranscriptHints } from "./context.mjs";

export function buildDeckModel(input = {}) {
  const normalized = normalizeInput(input);
  const transcriptHints = normalized.sourceType === "transcript"
    ? [...new Set([...normalized.transcriptHints, ...createTranscriptHints(normalized.sourceText)])]
    : normalized.transcriptHints;

  return {
    title: normalized.title,
    sourceType: normalized.sourceType,
    audience: normalized.audience,
    tone: normalized.tone,
    transcriptHints,
    slides: [
      {
        type: "title",
        heading: normalized.title,
        subheading: normalized.audience,
      },
    ],
    theme: {
      engine: "revealjs",
      style: "polished",
    },
  };
}

export function addSlide(deck, slide) {
  return {
    ...deck,
    slides: [...deck.slides, slide],
  };
}
