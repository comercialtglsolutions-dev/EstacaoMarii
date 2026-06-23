"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Mode } from "@/lib/types";

interface ModeState {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

export const useModeStore = create<ModeState>()(
  persist(
    (set) => ({
      mode: "varejo",
      setMode: (mode) => set({ mode }),
    }),
    { name: "estacao-marii-mode-v1" },
  ),
);
