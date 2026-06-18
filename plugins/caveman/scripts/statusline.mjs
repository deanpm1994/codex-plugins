export function renderStatus(state) {
  const mode = state.enabled ? state.mode : 'off';
  const tokens = state.lifetime.estimatedTokensSaved;
  const money = state.lifetime.estimatedMoneySavedUsd.toFixed(2);
  return `caveman:${mode} saved:${tokens}t $${money}`;
}
