import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import type { WordCard } from "../../wordCardsSlice";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

import "./ListTable.css";
import { useRef} from "react";

type Props = {
  filteredCards: WordCard[];
};

const ListTable = ({ filteredCards }: Props) => {
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});

  const handleClick = (key: string) => {
    const audio = audioRefs.current[key];
    if (audio) {
      try {
        audio.currentTime = 0;
        void audio.play();
      } catch (e) {
        // ignore play errors (user gesture, etc.)
      }
    }
  };

  return (
    <>
      <TableContainer sx={{ maxHeight: 740 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "18px" }}>Слова</TableCell>
              <TableCell sx={{ fontSize: "18px" }}>Переводы</TableCell>
              <TableCell sx={{ fontSize: "18px" }}>🔊</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCards.map((card, idx) => {
              const key = `${card.word}-${idx}`;
              return (
                <TableRow key={key}>
                  <TableCell sx={{ fontSize: "18px" }}>{card.word}</TableCell>
                  <TableCell sx={{ fontSize: "18px" }}>
                    {card.translation}
                  </TableCell>
                  <TableCell sx={{ fontSize: "18px" }}>
                    {card.audioUrl ? (
                      <>
                        <audio
                          ref={(el) => (audioRefs.current[key] = el)}
                          src={card.audioUrl}
                          preload="none"
                          style={{ display: "none" }}
                        />
                        <VolumeUpIcon
                          className="volume-icon"
                          role="button"
                          tabIndex={0}
                          aria-label={`play audio for ${card.word}`}
                          onClick={() => handleClick(key)}
                        />
                      </>
                    ) : (
                      ""
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ListTable;
