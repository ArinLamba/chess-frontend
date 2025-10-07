
import { toAlgebraic } from "@/chess/helpers/notations";
import { MoveInfo } from "@/lib/types";
import { create } from "zustand";


type HistoryState = {
  moveHistory: string[];      // all algebraic notations (for display)
  moveDetails: MoveInfo[];    // full move data (for logic)
  currentMoveIndex: number;   // for replay / undo / redo
  viewIndex: number;
  
  addMove: (move: MoveInfo) => void;
  resetHistory: () => void;
  goToMove: (index: number) => void; // for replaying a move
};


export const useGameHistory = create<HistoryState>((set) => ({
  moveHistory: [],
  moveDetails: [],
  currentMoveIndex: -1,
  viewIndex: -1,

  addMove: (move) => {
    const notation = toAlgebraic(move);
    set((state) => ({
      moveHistory: [...state.moveHistory, notation],
      moveDetails: [...state.moveDetails, move],
      currentMoveIndex: state.currentMoveIndex + 1,
    }));
  },

  goToMove: (index) => set({ currentMoveIndex: index }),

  resetHistory: () => set({ moveHistory: [], moveDetails: [], currentMoveIndex: -1 }),
}));

