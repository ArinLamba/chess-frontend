import { Game } from "@/chess/game";
import { generateBoard } from "@/chess/helpers/board-helper";
import { create } from "zustand";

type GameState = {
  game: Game;
  setGame: (game: Game) => void;
  resetGame: () => void;
}

export const useGame = create<GameState>((set) => ({
  game: new Game(generateBoard(), "white"),

  setGame: (game) => set({ game : game}),
  resetGame: () => set({ game: new Game(generateBoard(), "white")}),
}));