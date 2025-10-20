import { getSocket } from "@/lib/socket";

import { Game } from "@/chess/game";
import { checkMove } from "@/chess/helpers/board-helper";

import { useSelectedSquare } from "@/store/use-selected-square";
import { useHighlightedMoves } from "@/store/use-highlighted-moves";
import { useGameHistory } from "@/store/use-history";
import { toast } from "sonner";
import { GameEngine } from "../game-engine";
import { MoveInfo, PieceUI, Position } from "@/lib/types";
import { useBotDepth } from "@/store/use-depth";
import { usePlaying } from "@/store/use-playing";
import { useGame } from "@/store/use-game";
import { SetStateAction } from "react";


type HanldeMoveProps = {
  row: number;
  col: number;
  mode?: string;
  setPieces: React.Dispatch<SetStateAction<PieceUI[]>>;
}

export const handleMove = ({
  row,
  col,
  mode,
  setPieces
}: HanldeMoveProps) => {
  
  const { highlightedMoves, setHighlightedMoves, clearHighlightedMoves } = useHighlightedMoves.getState();
  const { selectedSquare, setSelectedSquare, clearSelectedSquare } = useSelectedSquare.getState(); 
  const game = useGame.getState().game;
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
        handleBotMove({ from: selectedSquare, to: [row, col], game, setPieces });
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
  setPieces: React.Dispatch<SetStateAction<PieceUI[]>>;
}
const handleBotMove = ({
  from,
  to,
  game,
  setPieces,
}: HandleBotProps) => {
  const addMove = useGameHistory.getState().addMove;
  const botDepth = useBotDepth.getState().botDepth;
  const setIsPlaying = usePlaying.getState().setIsPlaying;

  const moveInfo = game.makeMove(from, to);
  addMove(moveInfo!);
  updatePiece({ setPieces, moveInfo });

  let checkmate = game.detectCheckMate();
  if(checkmate) {
    toast(`Check mate ${game.turn} wins`);
    setIsPlaying(false);
  }


  // here send the moves to the game engine it will make the move on its board and then we just update it one more time on our board
  // --- Bot turn ---
  const engine = new GameEngine(game, botDepth);
  const bestMove = engine.getBestMove();
  console.log(botDepth);

  if (!bestMove) return;
  const [botFrom, botTo] = bestMove;
  
  const botMoveInfo = game.makeMove(botFrom, botTo);
  
  checkmate = game.detectCheckMate();
  if (checkmate) {
    toast(`Check mate ${game.turn} wins`);
    setIsPlaying(false);
  }
  
  setTimeout(() => {
    updatePiece({ setPieces, moveInfo: botMoveInfo });
    addMove(botMoveInfo!);
  }, 600); // small delay for realism
  
}

type UpdatePieceProps = {
  setPieces: React.Dispatch<React.SetStateAction<PieceUI[]>>;
  moveInfo: MoveInfo | undefined;
};

export const updatePiece = ({ setPieces, moveInfo }: UpdatePieceProps) => {
  if (!moveInfo) return;

  const { from, to, capturedPiece, isCastling } = moveInfo;

  setPieces(prev => {
    let updated = prev
      // remove captured piece if any
      .filter(
        p =>
          !(
            capturedPiece &&
            p.row === to[0] &&
            p.col === to[1]
          )
      )
      // move the piece itself
      .map(p =>
        p.row === from[0] && p.col === from[1]
          ? { ...p, row: to[0], col: to[1] }
          : p
      );

    // ♜ Handle castling rook move
    if (isCastling) {
      const [rFrom, cFrom] = from;
      const [, cTo] = to;
      const isKingSide = cTo > cFrom;

      const rookFromCol = isKingSide ? 7 : 0;
      const rookToCol = isKingSide ? cTo - 1 : cTo + 1;

      updated = updated.map(p => {
        if (p.type === "rook" && p.row === rFrom && p.col === rookFromCol) {
          return { ...p, row: rFrom, col: rookToCol };
        }
        return p;
      });
    }

    return updated;
  });
};
