import type { Theme } from '@/lib/constants';
import { create } from 'zustand'

type UseThemeState = {
  theme: Theme;
  setTheme: (state: Theme) => void;
}

export const useTheme = create<UseThemeState>((set) => ({
  theme: "neo",
  setTheme: (theme: Theme) => set({theme : theme}),
}));
