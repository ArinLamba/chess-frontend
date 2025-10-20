import { PieceColor } from "@/lib/types";

// lib/board-mapper.ts
export const BoardMapper = {
  toVisual: (row: number, col: number, playerColor: PieceColor) => {
    // converts engine coordinates to what the player sees
    if (playerColor === "white") return [row, col];
    return [7 - row, 7 - col];
  },

  toLogical: (row: number, col: number, playerColor: "white" | "black") => {
    // converts visual click back to engine coordinates
    if (playerColor === "white") return [row, col];
    return [7 - row, 7 - col];
  },

  flipRowCol: (rowCol: [number, number]) => [7 - rowCol[0], 7 - rowCol[1]],
};
