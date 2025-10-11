import type { BoardType, PieceColor } from "@/lib/types";

const pieceValues: Record<string, number> = {
  pawn: 1,
  knight: 3,
  bishop: 3,
  rook: 5,
  queen: 9,
  king: 1000,
};

export const evaluateBoard = (board: BoardType, turn: PieceColor): number => {
  let score = 0;
  for (const row of board) {
    for (const piece of row) {
      if (!piece) continue;
      const value = pieceValues[piece.type];
      score += piece.color === "white" ? value : -value;
    }
  }

  // Return score from current player's view
  return turn === "white" ? score : -score;
};

