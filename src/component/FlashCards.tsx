import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import {
  forgetCard,
  type WordCard,
  type WordCardState,
} from "../wordCardsSlice";
import { Button, Card, CardActions, CardContent } from "@mui/material";
import "./FlashCards.css";

const FlashCards = () => {
  const cardState: WordCardState = useSelector(
    (state: RootState) => state.cards,
  );
  const activeCards: WordCard[] = cardState.cards.filter((el) => !el.forgotten);

  const dispatch = useDispatch();
  const [isTranslationVisible, setTranslationVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isForgetDisabled, setForgetDisabled] = useState(true);

  const handleNext = () => {
    setCurrentIndex((prev) => {
      if (prev >= activeCards.length - 1) {
        return 0;
      }
      return prev + 1;
    });
    setTranslationVisible(false);
    setForgetDisabled(true);
  };

  const handleShowTranslation = () => {
    setTranslationVisible(true);
    setForgetDisabled(false);
  };

  const handleMarkForgotten = () => {
    dispatch(forgetCard(activeCards[currentIndex]));
    setTranslationVisible(false);
    setForgetDisabled(true);
    activeCards.splice(currentIndex, 1);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (activeCards.length === 0) return;

      switch (event.key) {
        case "ArrowLeft":
          if (!isForgetDisabled) {
            handleMarkForgotten();
          }
          break;
        case "ArrowDown":
          if (!isTranslationVisible) {
            handleShowTranslation();
          }
          break;
        case "ArrowRight":
          handleNext();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    isTranslationVisible,
    isForgetDisabled,
    activeCards,
    currentIndex,
    dispatch,
  ]);

  return (
    <div className="flashCardsContainer">
      {activeCards.length === 0 ? (
        <p className="emptyMessage">No more cards to review!</p>
      ) : (
        <div className="cardWithHint">
          <Card className="flashCard">
            <CardContent className="cardWordSection">
              <div className="cardWordText">
                {activeCards[currentIndex]?.word}
              </div>
              {activeCards[currentIndex]?.audioUrl && (
                <audio
                  className="cardAudio"
                  controls
                  src={activeCards[currentIndex]?.audioUrl}
                  preload="none"
                >
                  Your browser does not support the audio element.
                </audio>
              )}
            </CardContent>
            <CardContent className="cardTranslationSection">
              <div className="cardTranslationText">
                {isTranslationVisible
                  ? activeCards[currentIndex]?.translation
                  : ""}
              </div>
            </CardContent>
            <CardActions className="cardActionsSection">
              <Button
                onClick={handleMarkForgotten}
                disabled={isForgetDisabled}
                size="large"
                variant="contained"
                color="error"
              >
                Забыл
              </Button>
              <Button
                onClick={handleShowTranslation}
                disabled={isTranslationVisible}
                size="large"
                variant="contained"
                color="primary"
              >
                Перевод
              </Button>
              <Button
                onClick={handleNext}
                size="large"
                variant="contained"
                color="success"
              >
                Next
              </Button>
            </CardActions>
          </Card>
          <p className="keyboardHint">
            Используйте клавиши клавиатуры для управления:
            <br />
            <strong>↓</strong> – показать перевод,
            <strong>←</strong> – отметить "забыл" (после перевода),
            <strong>→</strong> – следующая карточка
          </p>
        </div>
      )}
    </div>
  );
};

export default FlashCards;
