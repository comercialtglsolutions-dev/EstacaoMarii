"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Retorna `false` durante a renderização no servidor e na primeira passada do
 * cliente, e `true` após a hidratação. Padrão idiomático para evitar mismatch
 * ao ler estado vindo do localStorage (Zustand persist).
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
