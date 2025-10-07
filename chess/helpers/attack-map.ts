import type { BoardType, PieceColor } from "@/lib/types";

export const buildAttackMap = (board: BoardType, attackerColor: PieceColor): boolean[][] => {
  const attacked = Array.from({ length: 8 }, () => Array(8).fill(false));
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if(piece?.type === "king") continue;
      if(piece && piece.color === attackerColor) {
        const moves = piece.getValidMoves(r, c, board);
        for(const [mr, mc] of moves) attacked[mr][mc] = true;
      }
    }
  }
  return attacked;
}
