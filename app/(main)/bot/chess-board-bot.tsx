"use client";

import { useEffect, useState } from "react";

import { Square } from "../play/square";

import { handleMove } from "@/chess/helpers/front-move-helper"
import { generateBoard } from "@/chess/helpers/board-helper";

import { useReset } from "@/store/use-reset";
import { usePlaying } from "@/store/use-playing";
import { usePlayerColor } from "@/store/use-player-color";
import { useSelectedSquare } from "@/store/use-selected-square";
import { useHighlightedMoves } from "@/store/use-highlighted-moves";


import { Game } from "@/chess/game";



export const ChessBoardBot = () => {
  const isPlaying         = usePlaying(state => state.isPlaying);
  const playerColor       = usePlayerColor(state => state.playerColor);
  const resetTrigger      = useReset(state => state.resetTrigger);
  const selectedSquare    = useSelectedSquare(state => state.selectedSquare);
  const highlightedMoves  = useHighlightedMoves(state => state.highlightedMoves);


  const [game, setGame] = useState<Game>(new Game(generateBoard(), "white"));

  
  const handleClick = (row: number, col: number) => {
    if (!isPlaying) return; // TODO: later: connect socket after click
    handleMove({ row, col, game, setGame, mode:"bot" });
  };

  useEffect(() => {
    setGame(new Game(generateBoard(), "white"));
  }, [resetTrigger]);


  return (
    <div className="" onContextMenu={(e) => e.preventDefault()}>
      <div className='controls h-12 bg-neutral-800 border border-white/15 rounded'>
        Bot Component
      </div>
      <div className={playerColor === "black" ? "flip" : ""}>
        {game.board.map((row, i) => 
          <div key={i} className="grid" style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))` }}>
            {row.map((cell, j) => (
              <Square
                key={`${i}-${j}`}
                cell={cell}
                row={i}
                col={j}
                highlightedMoves={highlightedMoves}
                selectedSquare={selectedSquare}
                onClick={() => handleClick(i, j)}
              />  
            ))}
          </div>
        )}
      </div>
      <div className='controls h-12 bg-neutral-800 rounded border border-white/15'>
        My Component
      </div>

    </div>
  );
}
