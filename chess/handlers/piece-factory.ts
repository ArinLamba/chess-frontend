// PieceFactory.ts
import type { BoardType, PieceType, PieceColor } from "@/lib/types";
import { King } from "../pieces/king";
import { Pawn } from "../pieces/pawn";
import { Rook } from "../pieces/rook";
import { Piece } from "../pieces/piece";
import { Queen } from "../pieces/queen";
import { Knight } from "../pieces/knight";
import { Bishop } from "../pieces/bishop";

export class PieceFactory {
  static createPiece(type: PieceType, color: PieceColor, hasMoved = false): Piece {
    let p: Piece;
    switch (type) {
      case "pawn": p = new Pawn(color); break;
      case "rook": p = new Rook(color); break;
      case "knight": p = new Knight(color); break;
      case "bishop": p = new Bishop(color); break;
      case "queen": p = new Queen(color); break;
      case "king": p = new King(color); break;
      default: throw new Error("Unknown piece type: " + type);
    }
    p.hasMoved = hasMoved;
    return p;
  }

  static cloneBoard(board: BoardType): BoardType {
    return board.map(row =>
      row.map(cell => {
        if (!cell) return null;
        return this.createPiece(cell.type, cell.color, cell.hasMoved);
      })
    );
  }
}
