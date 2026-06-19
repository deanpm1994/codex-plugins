export function estimateSavings(beforeTokens, afterTokens, usdPerToken) {
  const tokensSaved = Math.max(0, Number(beforeTokens) - Number(afterTokens));
  const moneySavedUsd = Math.max(0, tokensSaved * Number(usdPerToken));

  return {
    tokensSaved,
    moneySavedUsd
  };
}

export function mergeSavings(state, savings) {
  return {
    ...state,
    lifetime: {
      estimatedTokensSaved: state.lifetime.estimatedTokensSaved + savings.tokensSaved,
      estimatedMoneySavedUsd: state.lifetime.estimatedMoneySavedUsd + savings.moneySavedUsd
    }
  };
}
