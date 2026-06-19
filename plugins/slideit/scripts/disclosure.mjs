export function resolveDisclosure({ audience, source, ambiguity } = {}) {
  if (ambiguity) {
    return {
      action: "ask",
      reason: "Transcript disclosure is ambiguous.",
    };
  }

  const audienceText = String(audience || "").toLowerCase();
  const sourceText = String(source || "").toLowerCase();

  if (sourceText.includes("transcript") && audienceText.includes("external")) {
    return {
      action: "hide",
      reason: "External audience should not see unreviewed transcript detail.",
    };
  }

  if (audienceText.includes("internal") || audienceText.includes("team")) {
    return {
      action: "show",
      reason: "Internal audience can see the source context.",
    };
  }

  return {
    action: "hide",
    reason: "Default to hiding source detail unless the user clarifies.",
  };
}

export function disclosureIsAmbiguous(context = {}) {
  return Boolean(context.ambiguity || !context.audience || !context.source);
}
