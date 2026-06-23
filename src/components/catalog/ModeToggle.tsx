"use client";

import { Store, Boxes } from "lucide-react";
import { cn } from "@/lib/utils";
import { useModeStore } from "@/store/useModeStore";
import { useMounted } from "@/lib/use-mounted";
import type { Mode } from "@/lib/types";

const OPTIONS: { value: Mode; label: string; icon: typeof Store }[] = [
  { value: "varejo", label: "Varejo", icon: Store },
  { value: "atacado", label: "Atacado", icon: Boxes },
];

export function ModeToggle() {
  const mode = useModeStore((s) => s.mode);
  const setMode = useModeStore((s) => s.setMode);
  const mounted = useMounted();
  const current = mounted ? mode : "varejo";

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-3 sm:flex-row sm:items-center sm:gap-4 sm:p-3.5">
      <span className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
        Modo de compra
      </span>
      <div className="flex rounded-full bg-secondary p-1">
        {OPTIONS.map(({ value, label, icon: Icon }) => {
          const on = current === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setMode(value)}
              aria-pressed={on}
              className={cn(
                "inline-flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-all sm:flex-initial",
                on
                  ? value === "atacado"
                    ? "bg-white text-sage shadow-sm"
                    : "bg-white text-rose-deep shadow-sm"
                  : "text-muted-foreground",
              )}
            >
              <Icon className="size-4" /> {label}
            </button>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground sm:flex-1">
        {current === "varejo"
          ? "Preço unitário para compra avulsa. Para revenda, ative o Atacado."
          : "Preço de atacado aplicado a todos os itens. Ideal para revenda."}
      </p>
    </div>
  );
}
