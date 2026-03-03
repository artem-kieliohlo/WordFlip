import { configureStore } from "@reduxjs/toolkit";
import wordCardsReducer, { type WordCardState, initialState as wordCardsInitial } from "./wordCardsSlice";
import { loadWordCards } from "./localStorage";
import { dictionaryApi } from "./dictionaryApi";

// настраиваем preloadedState через helper
function loadState(): WordCardState | undefined {
  return loadWordCards();
}

const persisted = loadState();

export const store = configureStore({
  reducer: {
    cards: wordCardsReducer,
    [dictionaryApi.reducerPath]:dictionaryApi.reducer
  },
  preloadedState: {
    cards: persisted ?? wordCardsInitial,
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(dictionaryApi.middleware)
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch