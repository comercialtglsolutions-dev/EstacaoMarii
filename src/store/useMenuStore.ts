"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_MENU } from "@/lib/data";
import type { Product } from "@/lib/types";

export type ProductInput = Omit<Product, "id">;

interface MenuState {
  menu: Product[];
  addProduct: (data: ProductInput) => void;
  updateProduct: (id: string, data: ProductInput) => void;
  removeProduct: (id: string) => void;
}

export const useMenuStore = create<MenuState>()(
  persist(
    (set) => ({
      menu: DEFAULT_MENU,
      addProduct: (data) =>
        set((s) => ({
          menu: [...s.menu, { id: Date.now().toString(), ...data }],
        })),
      updateProduct: (id, data) =>
        set((s) => ({
          menu: s.menu.map((m) => (m.id === id ? { ...m, ...data, id } : m)),
        })),
      removeProduct: (id) =>
        set((s) => ({ menu: s.menu.filter((m) => m.id !== id) })),
    }),
    { name: "estacao-marii-menu-v1" },
  ),
);
