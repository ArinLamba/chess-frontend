import type { PieceColor, PieceType, Position } from "@/lib/types";
import type { Piece } from "@/chess/pieces/piece";
import { pieceThemes, type Theme } from "@/lib/constants";
import { useTheme } from "@/store/use-theme";
import Image from "next/image";

type Props = {
  cell: Piece | null;
  row: number;
  col: number;
  highlightedMoves: Position[]; // pass this from ChessBoard
  selectedSquare: Position | null;
  onClick: () => void;
};

export const Square = ({ cell, row, col, highlightedMoves, selectedSquare, onClick }: Props) => {

  const theme = useTheme(state => state.theme);
  const sum = row + col;

  let className = "xl:h-20 xl:w-20 lg:h-19 lg:w-19 md:h-16 md:w-16 h-14 w-14 hover:border-2 border-amber-50 aspect-square text-neutral-800 flex items-center justify-center relative";
  if (sum % 2 !== 0) className += " bg-[#AD6C4C]";
  else className += " bg-[#E6D6D3]";

  const isMove = highlightedMoves.some(([r, c]) => r === row && c === col);
  const isCapture = cell !== null && isMove;

  return (
    <div className={`${className} group`} onClick={onClick}>
      {/* piece */}
      {cell && (
        <Image
          height={70}
          width={70}
          src={getPiece(cell.type, cell.color, theme)}
          alt={`${cell.type} ${cell.color}`}
          className=" aspect-square pointer-events-none select-none z-40"
        />
      )}

      {/* capture highlight */}
      {isCapture && (
        <div className="absolute inset-0  bg-red-400/40 pointer-events-none "></div>
      )}
      {/* legal move dot on empty squares */}
      {isMove && !isCapture && (
        <div className=" absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className=" lg:h-6 lg:w-6 md:h-5 md:w-5 h-4 w-4 bg-black/20 rounded-full group-hover:scale-125 transition-transform"></div>
        </div>
      )}


      {/* selected piece highlight */}
      {selectedSquare && selectedSquare[0] === row && selectedSquare[1] === col && (
        <div className="absolute inset-0 border-4 bg-yellow-400/40  pointer-events-none"></div>
      )}
    </div>
  );
};


const getPiece = (type: PieceType, color: PieceColor, theme: Theme): string => {
  if (!type || !color) return "";
  return pieceThemes[theme][`${type}-${color}`];
};
