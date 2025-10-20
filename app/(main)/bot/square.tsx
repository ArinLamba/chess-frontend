import type {  Position } from "@/lib/types";
import { useGame } from "@/store/use-game";


type Props = {
  row: number;
  col: number;
  highlightedMoves: Position[]; // pass this from ChessBoard
  selectedSquare: Position | null;
  onClick: () => void;
};

export const Square = ({ row, col, highlightedMoves, selectedSquare, onClick }: Props) => {
  const game = useGame(state => state.game);
  
  const sum = row + col;

  let className = "xl:h-20 xl:w-20 lg:h-19 lg:w-19 md:h-16 md:w-16 h-14 w-14 relative hover:border-2 transition-colors border-white aspect-square flex items-center justify-center";
  if (sum % 2 !== 0) className += " bg-[#AD6C4C]";
  else className += " bg-[#E6D6D3]";

  const piece = game.board[row][col];

  const isMove = highlightedMoves.some(([r, c]) => r === row && c === col);
  const isCapture = isMove && piece;

  return (
    <div className={`${className} group`} onClick={onClick}>
      
      {/* legal move dot on empty squares */}
      {isMove  && (
        <div className=" absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className=" lg:h-6 lg:w-6 md:h-5 md:w-5 h-4 w-4 bg-black/20 rounded-full group-hover:scale-125 transition-transform"></div>
        </div>
      )}

      {isCapture && (
        <div className="absolute inset-0 bg-red-400/40 pointer-events-none "></div>
      )}

      {/* selected piece highlight */}
      {selectedSquare && selectedSquare[0] === row && selectedSquare[1] === col && (
        <div className="absolute inset-0 bg-yellow-400/40  pointer-events-none"></div>
      )}
    </div>
  );
};


