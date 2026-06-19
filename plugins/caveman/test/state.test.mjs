import test from 'node:test';
import assert from 'node:assert/strict';
import { defaultState } from '../scripts/state.mjs';

test('defaultState returns caveman defaults', () => {
  assert.deepEqual(defaultState(), {
    enabled: false,
    mode: 'medium',
    lifetime: {
      estimatedTokensSaved: 0,
      estimatedMoneySavedUsd: 0
    }
  });
});
