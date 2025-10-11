import { getSocket } from "@/lib/socket";

import { Game } from "@/chess/game";
import { checkMove } from "@/chess/helpers/board-helper";

import { useSelectedSquare } from "@/store/use-selected-square";
import { useHighlightedMoves } from "@/store/use-highlighted-moves";
import { useGameHistory } from "@/store/use-history";
import { toast } from "sonner";
import { GameEngine } from "../game-engine";
import { Position } from "@/lib/types";


type HanldeMoveProps = {
  row: number;
  col: number;
  game: Game;
  setGame: (game: Game) => void;
  mode?: string;
}

export const handleMove = ({
  row,
  col,
  game,
  setGame,
  mode,
}: HanldeMoveProps) => {

  const { highlightedMoves, setHighlightedMoves, clearHighlightedMoves } = useHighlightedMoves.getState();
  const { selectedSquare, setSelectedSquare, clearSelectedSquare } = useSelectedSquare.getState(); 

  const piece = game.board[row][col];
  const socket = getSocket();

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
      if(socket && mode === "pvp") {
        socket.emit("move", [selectedSquare, [row, col]]);
      }
      else if(mode === "bot") {
        handleBotMove({ from: selectedSquare, to: [row, col], game, setGame });
      }
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
type HandleBotProps = {
  from: Position;
  to: Position;
  game: Game;
  setGame: (game: Game) => void;
}
const handleBotMove = ({
  from,
  to,
  game,
  setGame,
}: HandleBotProps) => {
  const addMove = useGameHistory.getState().addMove;
  const clonedBoard = game.cloneBoard();
  const newGame = new Game(clonedBoard, game.turn);
  const moveInfo = newGame.makeMove(from, to);
  addMove(moveInfo!);

  const checkmate = newGame.detectCheckMate();
  if(checkmate) toast(`Check mate ${game.turn} wins`);

  setGame(newGame);

  // here send the moves to the game engine it will make the move on its board and then we just update it one more time on our board
  // --- Bot turn ---
  const engine = new GameEngine(newGame);
  const bestMove = engine.getBestMove();

  if (bestMove) {
    const [from, to] = bestMove;
    const cloned = newGame.cloneBoard();
    const botGame = new Game(cloned, newGame.turn);
    const botMoveInfo = botGame.makeMove(from, to);
    
    const checkmate = botGame.detectCheckMate();
    if (checkmate) toast(`Check mate ${botGame.turn} wins`);
    
    setTimeout(() => {
      setGame(botGame)
      addMove(botMoveInfo!);
    }, 600); // small delay for realism
  }
}
