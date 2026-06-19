export function shouldOfferPresentation(session = {}) {
  const transcriptLength = Number(session.transcriptLength || 0);
  const searchCount = Number(session.searchCount || 0);
  const hasTranscript = Boolean(session.hasTranscript);
  const searchHeavy = Boolean(session.searchHeavy);

  return searchHeavy || hasTranscript || transcriptLength > 1000 || searchCount > 3;
}

export function buildOfferMessage(session = {}) {
  if (!shouldOfferPresentation(session)) {
    return null;
  }

  return "This looks presentation-worthy. Want me to turn it into a Slideit deck?";
}
