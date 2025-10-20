import { create } from 'zustand';

interface BotDepthState {
  depth: number;    // slider value (1–4)
  botDepth: number; // actual depth used by engine
  setDepth: (val: number) => void;
}

export const useBotDepth = create<BotDepthState>((set) => ({
  depth: 1,    // default depth 1
  botDepth: 1,
  setDepth: (val) => {
    const depth = Math.min(Math.max(val, 1), 5); // clamp between 1-4
    set({ depth, botDepth: depth });
  },
}));
