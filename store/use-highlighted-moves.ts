// src/store/useHighlightedMoves.ts
import { create } from "zustand";
import type { Position } from "@/lib/types";

type HighlightedMovesState = {
  highlightedMoves: Position[];
  setHighlightedMoves: (moves: Position[]) => void;
  clearHighlightedMoves: () => void;
};

export const useHighlightedMoves = create<HighlightedMovesState>((set) => ({
  highlightedMoves: [],
  setHighlightedMoves: (moves) => set({ highlightedMoves: moves }),
  clearHighlightedMoves: () => set({ highlightedMoves: [] }),
}));
