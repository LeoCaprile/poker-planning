import { Theme, ThemeT } from "./../types/index";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type SwitchThemeStore = {
  theme: ThemeT;
  setTheme: (theme: ThemeT) => void;
};

export const useSwitchThemeStore = create<SwitchThemeStore>()(
  persist(
    (set) => ({
      theme: Theme.LIGHT,
      setTheme: (theme: ThemeT) => set({ theme }),
    }),
    {
      name: "theme-storage",
      skipHydration: true,
    }
  )
);
