"use client";

import { useEffect, useState } from "react";

import { Square } from "./square";

import { handleMove } from "@/chess/helpers/front-move-helper"
import { usePlaying } from "@/store/use-playing";
import { useHighlightedMoves } from "@/store/use-highlighted-moves";
import { useSelectedSquare } from "@/store/use-selected-square";

import { getSocket } from "@/lib/socket";

import { useGame } from "@/store/use-game";

import { useGameHistory } from "@/store/use-history";
import { SOCKET_EVENTS } from "@/lib/events";
import { usePlayerColor } from "@/store/use-player-color";
import { PieceColor, PieceType, PieceUI, initialPieces } from "@/lib/types";
import { useTheme } from "@/store/use-theme";
import { pieceThemes, Theme } from "@/lib/constants";
import Image from "next/image";

export const ChessBoardOnline = () => {
  const isPlaying = usePlaying(state => state.isPlaying);
  const highlightedMoves = useHighlightedMoves(state => state.highlightedMoves);
  const selectedSquare = useSelectedSquare(state => state.selectedSquare);
  const  addMove  = useGameHistory(state => state.addMove);
  const playerColor = usePlayerColor(state => state.playerColor);
  const theme = useTheme(state => state.theme);
  const game = useGame(state => state.game);

  const [pieces, setPieces] = useState<PieceUI[]>(initialPieces);

  const rows = Array.from({ length: 8 }, (_, i) => i);

  const socket = getSocket();
  
  const handleClick = (row: number, col: number) => {
    if (!isPlaying) return; // TODO: later: connect socket after click
    handleMove({ row, col, mode: "pvp", setPieces });
    
  };


  useEffect(() => {
    if(!socket) return;

    socket.on(SOCKET_EVENTS.OPPONENT_MOVE, (move) => {
      const [from, to, moveInfo] = move;
      
      const { capturedPiece, isCastling } = moveInfo;

      setPieces(prev => {
        let updated = prev
          // remove captured piece if any
          .filter(
            p =>
              !(
                capturedPiece &&
                p.row === to[0] &&
                p.col === to[1]
              )
          )
          // move the piece itself
          .map(p =>
            p.row === from[0] && p.col === from[1]
              ? { ...p, row: to[0], col: to[1] }
              : p
          );

        // ♜ Handle castling rook move
        if (isCastling) {
          const [rFrom, cFrom] = from;
          const [, cTo] = to;
          const isKingSide = cTo > cFrom;

          const rookFromCol = isKingSide ? 7 : 0;
          const rookToCol = isKingSide ? cTo - 1 : cTo + 1;

          updated = updated.map(p => {
            if (p.type === "rook" && p.row === rFrom && p.col === rookFromCol) {
              return { ...p, row: rFrom, col: rookToCol };
            }
            return p;
          });
        }

        return updated;
      });
      
      game.makeMove(from, to);
      addMove(moveInfo);
    });

    socket.on(SOCKET_EVENTS.GAME_OVER, () => {
      // TODO: ADD A MODAL TO RESTART
      alert("Game Over");
    })

    
    return () => {
      socket.off("opponentMove");
    }
  }, [addMove, socket]);
  
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
            className={`absolute transition-all xl:h-20 xl:w-20 lg:h-19 lg:w-19 md:h-16 md:w-16 h-14 w-14 `}
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
}

const getPiece = (type: PieceType, color: PieceColor, theme: Theme): string => {
  if (!type || !color) return "";
  return pieceThemes[theme][`${type}-${color}`];
};
