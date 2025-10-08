import { create } from "zustand";

type UseColorState = {
  playerColor: "white" | "black" | null;
  setPlayerColor: (color: "white" | "black") => void;
};

export const usePlayerColor = create<UseColorState>((set) => ({
  playerColor: null,
  setPlayerColor: (playerColor) => set({ playerColor }),
}));
