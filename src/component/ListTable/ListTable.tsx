import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import type { WordCard } from "../../wordCardsSlice";

import "./ListTable.css";

type Props = {
  filteredCards: WordCard[];
};

const ListTable = ({ filteredCards }: Props) => {
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
            {filteredCards.map((card) => {
              return (
                <TableRow key={crypto.randomUUID()}>
                  <TableCell sx={{ fontSize: "18px" }}>
                    {card.word}
                  </TableCell>
                  <TableCell sx={{ fontSize: "18px" }}>
                    {card.translation}
                  </TableCell>
                        <TableCell sx={{ fontSize: "18px" }}>
                          {card.audioUrl ? (
                            <audio
                              controls
                              src={card.audioUrl}
                              preload="none"
                              style={{ maxWidth: "150px" }}
                            />
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
