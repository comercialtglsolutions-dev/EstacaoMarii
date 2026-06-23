"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/lib/types";

export function cartKey(
  id: string,
  size: string | null,
  color: string | null,
): string {
  return [id, size ?? "", color ?? ""].join("|");
}

interface CartState {
  items: CartItem[];
  add: (item: {
    id: string;
    size: string | null;
    color: string | null;
    qty: number;
  }) => void;
  changeQty: (key: string, delta: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  count: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: ({ id, size, color, qty }) =>
        set((s) => {
          const key = cartKey(id, size, color);
          const existing = s.items.find((c) => c.key === key);
          if (existing) {
            return {
              items: s.items.map((c) =>
                c.key === key ? { ...c, qty: c.qty + qty } : c,
              ),
            };
          }
          return { items: [...s.items, { key, id, size, color, qty }] };
        }),
      changeQty: (key, delta) =>
        set((s) => {
          const items = s.items
            .map((c) =>
              c.key === key ? { ...c, qty: Math.max(0, c.qty + delta) } : c,
            )
            .filter((c) => c.qty > 0);
          return { items };
        }),
      remove: (key) =>
        set((s) => ({ items: s.items.filter((c) => c.key !== key) })),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((sum, c) => sum + c.qty, 0),
    }),
    { name: "estacao-marii-cart-v1" },
  ),
);
