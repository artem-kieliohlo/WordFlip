import React from "react";
import { repeated, type WordCard, type WordCardState } from "../wordCardsSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import ListTable from "./ListTable/ListTable";
import { Button } from "@mui/material";

const RepeatWords = () => {
  const cardState: WordCardState = useSelector(
    (state: RootState) => state.cards,
  );
  const forgotten: WordCard[] = cardState.cards.filter(
    (el) => el.forgotten === true,
  );
  const dispatch = useDispatch();
  const handelClick = () => {
    dispatch(repeated());
  };
  return (
    <div>
      <ListTable filteredCards={forgotten} />
      <Button onClick={handelClick} variant="contained">
        Повторил
      </Button>
    </div>
  );
};

export default RepeatWords;
