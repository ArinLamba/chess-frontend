import { Piece } from "@/chess/pieces/piece";


export type PieceType = "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
export type PieceColor = "white" | "black";

export type Position = [number, number];

export type BoardType = (Piece | null)[][];

export type MoveInfo = {
  piece: PieceType;
  color: PieceColor;
  from: Position;
  to: Position;

  captured: boolean;
  capturedPiece?: Piece;      // store captured piece if any
  
  prevHasMoved: boolean;      // useful for king/rook (castling)

  isCastling: "kingside" | "queenside" | null;
  isPromotion: boolean;
  promotedPiece?: Piece;      // original piece before promotion
  
  isCheck: boolean;
  isCheckmate: boolean;
};


export type PieceUI = {
  id: string;
  type: PieceType;
  color: PieceColor;
  row: number;
  col: number;
};

export const initialPieces: PieceUI[] = [
  // helper to generate pawns
  ...["white", "black"].flatMap((color) => {
    const row = color === "white" ? 6 : 1;
    return Array.from({ length: 8 }, (_, i) => ({
      id: `${color[0]}P${i + 1}`,
      type: "pawn" as PieceType,
      color: color as PieceColor,
      row,
      col: i,
    }));
  }),
  // other pieces
  { id: "wR1", type: "rook", color: "white", row: 7, col: 0 },
  { id: "wN1", type: "knight", color: "white", row: 7, col: 1 },
  { id: "wB1", type: "bishop", color: "white", row: 7, col: 2 },
  { id: "wQ", type: "queen", color: "white", row: 7, col: 3 },
  { id: "wK", type: "king", color: "white", row: 7, col: 4 },
  { id: "wB2", type: "bishop", color: "white", row: 7, col: 5 },
  { id: "wN2", type: "knight", color: "white", row: 7, col: 6 },
  { id: "wR2", type: "rook", color: "white", row: 7, col: 7 },
  { id: "bR1", type: "rook", color: "black", row: 0, col: 0 },
  { id: "bN1", type: "knight", color: "black", row: 0, col: 1 },
  { id: "bB1", type: "bishop", color: "black", row: 0, col: 2 },
  { id: "bQ", type: "queen", color: "black", row: 0, col: 3 },
  { id: "bK", type: "king", color: "black", row: 0, col: 4 },
  { id: "bB2", type: "bishop", color: "black", row: 0, col: 5 },
  { id: "bN2", type: "knight", color: "black", row: 0, col: 6 },
  { id: "bR2", type: "rook", color: "black", row: 0, col: 7 },
];