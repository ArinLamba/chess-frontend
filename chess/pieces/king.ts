
import type { BoardType, PieceColor, Position } from "@/lib/types";
import { Piece } from "./piece";
import { KING_DIRS } from "@/lib/constants";


export class King extends Piece {
  constructor(color: PieceColor) {
    super(color, "king");
  }

  getValidMoves(row: number, col: number, board: BoardType): Position[] {
    const moves: Position[] = [];

    for(const [dr, dc] of KING_DIRS) {
      const r = row + dr;
      const c = col + dc;

      if(!this.isValid(r, c) ) continue;
      const target = board[r][c];
      if(target === null || this.canCapture(target)) {
        moves.push([r, c]);
      }
    }

    // for castling adding two moves
    // this will only add moves for the king all the check and move legality will be checked in the game class
    if(!this.hasMoved) {
      const homeRow = this.color === "white" ? 7 : 0;

      // Kingside Castling
      const kingsideRook = board[homeRow][7];
      if(
        kingsideRook && 
        kingsideRook.type === "rook" && 
        !kingsideRook.hasMoved && 
        !board[homeRow][5] && 
        !board[homeRow][6]
      ) {
        moves.push([homeRow, col + 2]);
      }

      // Queenside castling
      const queensideRook = board[homeRow][0];
      if(
        queensideRook && 
        queensideRook.type === "rook" && 
        !queensideRook.hasMoved && 
        !board[homeRow][3] && 
        !board[homeRow][2] && 
        !board[homeRow][1]
      ) {
        moves.push([homeRow, col - 2]);
      }
    }
    return moves;
  }
};