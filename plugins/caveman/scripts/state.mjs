import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LOCAL_STATE_PATH = path.join(ROOT, '.caveman-state.json');

export function defaultState() {
  return {
    enabled: false,
    mode: 'medium',
    lifetime: {
      estimatedTokensSaved: 0,
      estimatedMoneySavedUsd: 0
    }
  };
}

function cloneState(state) {
  return JSON.parse(JSON.stringify(state));
}

export async function loadState() {
  const external = await loadExternalState();
  if (external) return external;

  try {
    const raw = await fs.readFile(LOCAL_STATE_PATH, 'utf8');
    return normalizeState(JSON.parse(raw));
  } catch {
    return defaultState();
  }
}

export async function saveState(nextState) {
  const normalized = normalizeState(nextState);
  if (await saveExternalState(normalized)) return normalized;

  await fs.writeFile(LOCAL_STATE_PATH, `${JSON.stringify(normalized, null, 2)}\n`);
  return normalized;
}

function normalizeState(input) {
  const base = defaultState();
  const state = input && typeof input === 'object' ? input : {};
  return {
    enabled: Boolean(state.enabled),
    mode: ['low', 'medium', 'high'].includes(state.mode) ? state.mode : base.mode,
    lifetime: {
      estimatedTokensSaved: numberOrZero(state.lifetime?.estimatedTokensSaved),
      estimatedMoneySavedUsd: numberOrZero(state.lifetime?.estimatedMoneySavedUsd)
    }
  };
}

function numberOrZero(value) {
  return Number.isFinite(Number(value)) ? Number(value) : 0;
}

async function loadExternalState() {
  const store = getExternalStore();
  if (!store?.loadState) return null;
  const state = await store.loadState('caveman');
  return state ? normalizeState(state) : null;
}

async function saveExternalState(nextState) {
  const store = getExternalStore();
  if (!store?.saveState) return false;
  await store.saveState('caveman', cloneState(nextState));
  return true;
}

function getExternalStore() {
  return globalThis.codex?.storage ?? globalThis.Codex?.storage ?? null;
}
