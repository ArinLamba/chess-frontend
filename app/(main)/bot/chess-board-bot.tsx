"use client";

import { useEffect, useState } from "react";

import { Square } from "./square";

import { handleMove } from "@/chess/helpers/front-move-helper"

import { useReset } from "@/store/use-reset";
import { usePlaying } from "@/store/use-playing";
import { usePlayerColor } from "@/store/use-player-color";
import { useSelectedSquare } from "@/store/use-selected-square";
import { useHighlightedMoves } from "@/store/use-highlighted-moves";


import { initialPieces, PieceColor, PieceType, PieceUI } from "@/lib/types";
import Image from "next/image";
import { type Theme, pieceThemes } from "@/lib/constants";
import { useTheme } from "@/store/use-theme";




export const ChessBoardBot = () => {
  const isPlaying         = usePlaying(state => state.isPlaying);
  const playerColor       = usePlayerColor(state => state.playerColor);
  const resetTrigger      = useReset(state => state.resetTrigger);
  const selectedSquare    = useSelectedSquare(state => state.selectedSquare);
  const highlightedMoves  = useHighlightedMoves(state => state.highlightedMoves);
  const theme = useTheme(state => state.theme);

  const [pieces, setPieces] = useState<PieceUI[]>(initialPieces);

  const rows = Array.from({ length: 8 }, (_, i) => i);
  
  const handleClick = (row: number, col: number) => {
    if (!isPlaying) return; // TODO: later: connect socket after click
    handleMove({ row, col, mode: "bot", setPieces });
    
  };

  useEffect(() => {
    setPieces(initialPieces);
  }, [resetTrigger]);


  return (
    <div className="" onContextMenu={(e) => e.preventDefault()}>
      <div className='controls h-12 bg-neutral-800 border border-white/15 rounded'>
        Bot Component
      </div>
      <div className={`relative ${playerColor === "black" ? "flip" : ""}`}>
        {rows.map((row) => (
          <div key={row} className="grid grid-cols-8">
            {rows.map((col) => (
              <Square
                key={`${row}-${col}`}
                row={row}
                col={col}
                highlightedMoves={highlightedMoves}
                selectedSquare={selectedSquare}
                onClick={() => handleClick(row, col)}
              />
            ))}
          </div>
        ))}
        {pieces.map(piece => (
          <Image
            key={piece.id}
            src={getPiece(piece.type, piece.color, theme)}
            alt={`${piece.type} ${piece.color}`}
            width={74}
            height={74}
            className="absolute transition-all xl:h-20 xl:w-20 lg:h-19 lg:w-19 md:h-16 md:w-16 h-14 w-14"
            style={{
              top: `${piece.row * 12.5}%`,
              left: `${piece.col * 12.5}%`,
            }}
            onClick={() => handleClick(piece.row, piece.col)}
          />
        ))}
      </div>
      <div className='controls h-12 bg-neutral-800 rounded border border-white/15'>
        My Component
      </div>

    </div>
  );
};

const getPiece = (type: PieceType, color: PieceColor, theme: Theme): string => {
  if (!type || !color) return "";
  return pieceThemes[theme][`${type}-${color}`];
};
