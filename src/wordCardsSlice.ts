import { createSlice } from "@reduxjs/toolkit";
import { saveWordCards } from "./localStorage";

export type WordCard = {
  word: string;
  translation: string;
  forgotten: boolean;
  // ссылка на аудиофайл произношения слова (может отсутствовать)
  audioUrl?: string;
};

export type WordCardState = {
  cards: WordCard[];
};

export const initialState: WordCardState = {
  cards: []
};

export const wordCardsSlice = createSlice({
  name: "wordCards",
  initialState,
  reducers: {
    addCard(state, action) {
      // payload может содержать audioUrl, просто сохраняем
      state.cards.push(action.payload);
      // сохраняем актуальный массив во избежание потери при обновлении
      //Стоит позже исправить для избегания совершения сайд эфектов в редусере
      try {
        saveWordCards(state);
      } catch {
        // ignore ошибки записи
      }
    },
    forgetCard(state, action) {
      
      const entry = state.cards.find((el) => el.word === action.payload.word);
      
      if (entry) {
        entry.forgotten = true;
        
        try {
          saveWordCards(state);
        } catch {
          // ignore ошибки записи
        }
      }
    },
    repeated(state) {
      state.cards.map(el => el.forgotten = false)
      saveWordCards(state)
    }

  }
});
export const { addCard, forgetCard, repeated } = wordCardsSlice.actions;
export default wordCardsSlice.reducer;