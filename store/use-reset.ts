import { create } from "zustand";

type UseResetState = {
  resetTrigger: boolean;
  setResetTrigger: () => void;
}

export const useReset = create<UseResetState>((set) => ({
  resetTrigger: false,
  setResetTrigger: () => set((state) => ({
    resetTrigger: !state.resetTrigger,
  })),
}))