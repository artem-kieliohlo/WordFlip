import { configureStore } from "@reduxjs/toolkit";
import wordCardsReducer, { type WordCardState, initialState as wordCardsInitial } from "./wordCardsSlice";
import { loadWordCards, saveWordCards } from "./localStorage";

// настраиваем preloadedState через helper
function loadState(): WordCardState | undefined {
  return loadWordCards();
}

// function saveState(state: WordCardState) {
//   saveWordCards(state);
// }

const persisted = loadState();

export const store = configureStore({
  reducer: {
    cards: wordCardsReducer,
  },
  preloadedState: {
    cards: persisted ?? wordCardsInitial,
  },
});

// subscribe and persist on every change
// store.subscribe(() => {
//   saveState(store.getState().cards);
// });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch