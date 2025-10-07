"use client";

import { useEffect, useState } from "react";

import { Square } from "./square";

import { handleMove } from "@/chess/helpers/front-move-helper"
import { usePlaying } from "@/store/use-running";
import { useHighlightedMoves } from "@/store/use-highlighted-moves";
import { useSelectedSquare } from "@/store/use-selected-square";

import { socket } from "@/lib/socket";

import { Game } from "@/chess/game";

// import { useGame } from "@/store/use-game";
import { generateBoard } from "@/chess/helpers/board-helper";
import { useGameHistory } from "@/store/use-history";


export const ChessBoard = () => {
  const isPlaying = usePlaying(state => state.isPlaying);
  const highlightedMoves = useHighlightedMoves(state => state.highlightedMoves);
  const selectedSquare = useSelectedSquare(state => state.selectedSquare);
  const  addMove  = useGameHistory(state => state.addMove);

  const [game, setGame] = useState<Game>(new Game(generateBoard(), "white"));

  
  const handleClick = (row: number, col: number) => {
    if (!isPlaying) return; // TODO: later: connect socket after click
    handleMove({ row, col, game });
  };

  useEffect(() => {
    
    socket.on("opponentMove", (move) => {
      const [from, to, moveInfo] = move;
      
      setGame((prevGame) => {
        const clonedBoard = prevGame.cloneBoard();
        const newGame = new Game(clonedBoard, prevGame.turn);
        newGame.makeMove(from , to);
        return newGame
      });
      addMove(moveInfo);
    });

    socket.on("gameOver", () => {
      alert("Game Over");
    })
    
    return () => {
      socket.off("opponentMove");
    }
  }, [addMove]);
  
  return (
    <div className="" onContextMenu={(e) => e.preventDefault()}>
      <div className='h-12 bg-neutral-800 border border-white/15 rounded'>
        Opponent Component
      </div>
      <div>
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
      <div className='h-12 bg-neutral-800 rounded border border-white/15'>
        My Component
      </div>

    </div>
  );
}

