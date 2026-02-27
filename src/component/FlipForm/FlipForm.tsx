import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCard, type WordCardState } from "../../wordCardsSlice";
import type { RootState } from "../../store";
import "./FlipForm.css";
import { Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useGetAudioQuery } from "../../dictionaryApi";

const FlipForm = () => {
  const cardState: WordCardState = useSelector(
    (state: RootState) => state.cards,
  );
  const dispatch = useDispatch();
  

  const [newWord, setNewWord] = useState("");
  const [newTranslation, setNewTranslation] = useState("");

  const { data: audioUrl, isError } = useGetAudioQuery(newWord);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWord.trim() === "" || newTranslation.trim() === "") {
      alert("Please fill in both fields");
      return;
    }
    if (cardState.cards.find((el) => el.word === newWord)) {
      return;
    }

    const audio:string = audioUrl[0].phonetics?.find(
      (el) => el.audio !== "",
    ).audio ;
    dispatch(
      addCard({
        word: newWord,
        translation: newTranslation,
        forgotten: false,
        audioUrl: audio,
      }),
    );
    setNewWord("");
    setNewTranslation("");
  };

  return (
    <form onSubmit={handleSubmit}>
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

      {isError && <div className="loadingAudio">Такое слово не известно</div>}

      <Button variant="contained" type="submit">
        {" "}
        <AddIcon />
        add
      </Button>
    </form>
  );
};

export default FlipForm;
