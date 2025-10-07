// src/store/useTurnStore.ts
import { create } from "zustand";
import type { PieceColor } from "@/lib/types";

type UseTurnState = {
  turn: PieceColor;

  setTurn: (color: PieceColor) => void;
  toggleTurn: () => void;
  resetTurn: () => void;
}

export const useTurnStore = create<UseTurnState>((set) => ({
  turn: "white",

  setTurn: (color) => set({ turn: color }),
  toggleTurn: () => set((state) => ({
    turn: state.turn === "white" ? "black" : "white",
  })),
  resetTurn: () => set({ turn: "white" }),
}));
