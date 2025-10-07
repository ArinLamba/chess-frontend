import { socket } from "@/lib/socket";

import { Game } from "@/chess/game";
import { checkMove } from "@/chess/helpers/board-helper";

import { useSelectedSquare } from "@/store/use-selected-square";
import { useHighlightedMoves } from "@/store/use-highlighted-moves";


type HanldeMoveProps = {
  row: number;
  col: number;
  game: Game;
}

export const handleMove = ({
  row,
  col,
  game,
 
}: HanldeMoveProps) => {

  const { highlightedMoves, setHighlightedMoves, clearHighlightedMoves } = useHighlightedMoves.getState();
  const { selectedSquare, setSelectedSquare, clearSelectedSquare } = useSelectedSquare.getState(); 

  const piece = game.board[row][col];

  // ---- FIRST CLICK ----
  if (selectedSquare === null) {
    if (piece && piece.color === game.turn) {
      setSelectedSquare([row, col]);
      const moves = game.getLegalMoves(row, col);
      setHighlightedMoves(moves);
    } else {
      clearHighlightedMoves();
    }
    return;
  }
  
  // ---- SECOND CLICK ----
  if (selectedSquare) {
    const [prevRow, prevCol] = selectedSquare;


    // click on the same piece
    if(prevRow === row && prevCol === col) {
      clearSelectedSquare();
      clearHighlightedMoves();
      return;
    }

    // Case 1: clicked on a valid move square
    if (checkMove([row, col], highlightedMoves)) {
      socket.emit("move", [selectedSquare, [row, col]]);
    }

    // Case 2: clicked on another piece of the same color → treat as new selection
    else if (piece && piece.color === game.turn) {
      setSelectedSquare([row, col]);
      const moves = game.getLegalMoves(row, col);
      setHighlightedMoves(moves);
      return; // don’t reset selection here
    }

    // reset after any second click
    clearSelectedSquare();
    clearHighlightedMoves();
  }
};


