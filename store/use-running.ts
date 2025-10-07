import { create } from 'zustand'

type UsePlayingState = {
  isPlaying: boolean;
  setIsPlaying: (state: boolean) => void;
}

export const usePlaying = create<UsePlayingState>((set) => ({
  isPlaying: false,
  setIsPlaying: (state) => set({ isPlaying: state}),
}));
