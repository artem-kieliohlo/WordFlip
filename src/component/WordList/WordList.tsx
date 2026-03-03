import { useState } from "react";
import { useSelector } from "react-redux";
import { type WordCardState, type WordCard } from "../../wordCardsSlice";

import type { RootState } from "../../store";
import FlipForm from "../FlipForm/FlipForm";
import ListTable from "../ListTable/ListTable";
import "./WordList.css";
import { TextField, Box } from "@mui/material";

const WordList = () => {
  const cardState: WordCardState = useSelector(
    (state: RootState) => state.cards,
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCards: WordCard[] = cardState.cards.filter((card) =>
    card.word.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div id="WordList">
      <FlipForm />
      <Box>
        <TextField
          fullWidth
          placeholder="Поиск по словам..."
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>
      <ListTable filteredCards={filteredCards} />
    </div>
  );
};

export default WordList;
