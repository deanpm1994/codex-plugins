export function normalizeInput(input = {}) {
  return {
    sourceType: input.sourceType || "outline",
    title: input.title || "",
    audience: input.audience || "",
    tone: input.tone || "polished",
    sourceText: input.sourceText || "",
    transcriptHints: Array.isArray(input.transcriptHints) ? input.transcriptHints : [],
    diagramNeeds: Array.isArray(input.diagramNeeds) ? input.diagramNeeds : [],
  };
}

export function createTranscriptHints(sourceText) {
  const text = String(sourceText || "");
  if (!text.trim()) {
    return [];
  }

  const hints = [];
  if (/search|research|sources?/i.test(text)) {
    hints.push("source-aware");
  }
  if (/recommend|compare|choose|decision/i.test(text)) {
    hints.push("decision-heavy");
  }
  if (/diagram|figure|chart|visual/i.test(text)) {
    hints.push("visual-friendly");
  }
  return hints;
}
