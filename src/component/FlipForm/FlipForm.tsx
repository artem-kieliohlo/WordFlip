import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCard, type WordCardState } from "../../wordCardsSlice";
import type { RootState } from "../../store";
import "./FlipForm.css";
import { Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const FlipForm = () => {
  const cardState: WordCardState = useSelector(
    (state: RootState) => state.cards,
  );
  const dispatch = useDispatch();

  const [newWord, setNewWord] = useState("");
  const [newTranslation, setNewTranslation] = useState("");
  const [loadingAudio, setLoadingAudio] = useState(false);

  /**
   * Запрашивает словарь api и возвращает ссылку на аудио, если он есть
   */
  const fetchAudioForWord = async (word: string): Promise<string | undefined> => {
    if (!word) return undefined;
    setLoadingAudio(true);
    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(
          word,
        )}`,
      );
      if (!res.ok) return undefined;
      const data = (await res.json()) as any[];
      for (const entry of data) {
        if (entry.phonetics && Array.isArray(entry.phonetics)) {
          for (const ph of entry.phonetics) {
            if (ph && typeof ph.audio === "string" && ph.audio.length) {
              return ph.audio;
            }
          }
        }
      }
    } catch (err) {
      console.warn("fetchAudioForWord error", err);
    } finally {
      setLoadingAudio(false);
    }
    return undefined;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWord.trim() === "" || newTranslation.trim() === "") {
      alert("Please fill in both fields");
      return;
    }
    if (cardState.cards.find((el) => el.word === newWord)) {
      return;
    }
    // получаем аудио (если получится) до отправки
    fetchAudioForWord(newWord).then((audioUrl) => {
      dispatch(
        addCard({
          word: newWord,
          translation: newTranslation,
          forgotten: false,
          audioUrl,
        }),
      );
      // очистим форму независимого от результата запроса аудио
      setNewWord("");
      setNewTranslation("");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <label htmlFor="word">word</label> */}
      <TextField
        id="word"
        label="Word"
        variant="outlined"
        value={newWord}
        onChange={(e) => setNewWord(e.target.value)}
      />

      <TextField
        id="translation"
        label="Translation"
        variant="outlined"
        value={newTranslation}
        onChange={(e) => setNewTranslation(e.target.value)}
      />

      {loadingAudio && <div className="loadingAudio">Loading pronunciation…</div>}

      <Button variant="contained" type="submit">
        {" "}
        <AddIcon />
        add
      </Button>
    </form>
  );
};


export default FlipForm;
