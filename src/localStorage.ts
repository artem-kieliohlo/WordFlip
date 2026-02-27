// Utility for persisting the word cards slice in localStorage
import type { WordCardState } from "./wordCardsSlice";

const STORAGE_KEY = "wordCards";

export function loadWordCards(): WordCardState | undefined {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (serialized === null) return undefined;
    return JSON.parse(serialized) as WordCardState;
  } catch (e) {
    console.warn("loadWordCards failed", e);
    return undefined;
  }
}

export function saveWordCards(state: WordCardState) {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (e) {
    console.warn("saveWordCards failed", e);
  }
}
