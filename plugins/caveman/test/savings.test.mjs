import test from 'node:test';
import assert from 'node:assert/strict';
import { estimateSavings } from '../scripts/savings.mjs';
import { renderStatus } from '../scripts/statusline.mjs';

test('estimateSavings clamps negative savings to zero', () => {
  assert.deepEqual(estimateSavings(100, 120, 0.01), {
    tokensSaved: 0,
    moneySavedUsd: 0
  });
});

test('renderStatus includes mode and savings', () => {
  assert.equal(
    renderStatus({
      enabled: true,
      mode: 'high',
      lifetime: {
        estimatedTokensSaved: 42,
        estimatedMoneySavedUsd: 0.84
      }
    }),
    'caveman:high saved:42t $0.84'
  );
});
