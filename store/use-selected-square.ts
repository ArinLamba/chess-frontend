// src/store/useSelectedSquare.ts
import { create } from "zustand";
import type { Position } from "@/lib/types";

type SelectedSquareState = {
  selectedSquare: Position | null;
  setSelectedSquare: (square: Position | null) => void;
  clearSelectedSquare: () => void;
};

export const useSelectedSquare = create<SelectedSquareState>((set) => ({
  selectedSquare: null,
  setSelectedSquare: (square) => set({ selectedSquare: square }),
  clearSelectedSquare: () => set({ selectedSquare: null }),
}));
