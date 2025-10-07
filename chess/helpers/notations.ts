import { MoveInfo, Position } from "@/lib/types";

export const toAlgebraic = (move: MoveInfo): string => {
  if (!move) return "";

  if (move.isCastling === "kingside") return "O-O";
  if (move.isCastling === "queenside") return "O-O-O";

  const pieceMap: Record<string, string> = {
    pawn: "",
    knight: "N",
    bishop: "B",
    rook: "R",
    queen: "Q",
    king: "K",
  };

  const pieceLetter = pieceMap[move.piece] || "";
  const toSquare = toChessNotation(move.to);

  let notation = "";

  // Pawn capture includes file of origin
  if (move.captured) {
    if (move.piece === "pawn") {
      notation = `${toChessNotation(move.from)[0]}x${toSquare}`;
    } else {
      notation = `${pieceLetter}x${toSquare}`;
    }
  } else {
    notation = `${pieceLetter}${toSquare}`;
  }

  if (move.isCheckmate) notation += "#";
  else if (move.isCheck) notation += "+";

  return notation;
};



const toChessNotation = (pos: Position): string => {
  const [row, col] = pos;
  const files = ['a','b','c','d','e','f','g','h'];
  const rank = 8 - row;
  return `${files[col]}${rank}`;
}