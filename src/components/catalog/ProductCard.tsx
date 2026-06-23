"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { brl } from "@/lib/format";
import { unitPrice } from "@/lib/pricing";
import { CATEGORY_ART } from "@/lib/data";
import type { Product } from "@/lib/types";
import { useModeStore } from "@/store/useModeStore";
import { useCartStore } from "@/store/useCartStore";
import { useMounted } from "@/lib/use-mounted";

export function ProductCard({ product }: { product: Product }) {
  const mounted = useMounted();
  const mode = useModeStore((s) => s.mode);
  const add = useCartStore((s) => s.add);

  const [size, setSize] = useState<string | null>(product.sizes[0] ?? null);
  const [color, setColor] = useState<string | null>(product.colors[0] ?? null);
  const [qty, setQty] = useState(1);

  const effectiveMode = mounted ? mode : "varejo";
  const up = unitPrice(product, qty, effectiveMode);

  function handleAdd() {
    add({ id: product.id, size, color, qty });
    toast.success("Adicionado ao carrinho", {
      description: `${qty}× ${product.name}`,
    });
    setQty(1);
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/10 transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-14px_rgba(35,32,43,0.35)]">
      <div
        className="relative flex h-32 items-center justify-center text-5xl"
        style={{ background: CATEGORY_ART[product.cat] }}
      >
        <span className="drop-shadow-sm transition-transform group-hover:scale-110">
          {product.emoji || "📦"}
        </span>
        {product.season && (
          <span className="absolute top-2.5 left-2.5 rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold tracking-wide text-white uppercase">
            {product.season}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <h3 className="font-display text-[15px] leading-snug font-semibold text-ink">
          {product.name}
        </h3>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {product.desc}
        </p>

        {product.sizes.length > 0 && (
          <ChipRow
            label="Tamanho"
            options={product.sizes}
            value={size}
            onSelect={setSize}
          />
        )}
        {product.colors.length > 0 && (
          <ChipRow
            label="Cor / tema"
            options={product.colors}
            value={color}
            onSelect={setColor}
          />
        )}

        <div className="mt-auto pt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-rose-deep">
              {brl(up.price)}
            </span>
            {up.whole && (
              <span className="text-[11px] font-semibold text-sage">
                preço atacado
              </span>
            )}
          </div>
          {product.priceW > 0 && product.wholeMin > 0 && (
            <p className="mt-0.5 text-[11px] font-medium text-sage">
              Atacado {brl(product.priceW)} a partir de {product.wholeMin}un
            </p>
          )}
        </div>

        <div className="mt-1 flex items-center gap-2">
          <div className="flex items-center rounded-xl border border-border bg-white">
            <button
              type="button"
              aria-label="Diminuir"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex size-10 items-center justify-center text-muted-foreground active:scale-95"
            >
              <Minus className="size-4" />
            </button>
            <span className="w-7 text-center text-sm font-bold tabular-nums">
              {qty}
            </span>
            <button
              type="button"
              aria-label="Aumentar"
              onClick={() => setQty((q) => q + 1)}
              className="flex size-10 items-center justify-center text-muted-foreground active:scale-95"
            >
              <Plus className="size-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-ink text-sm font-bold text-white transition-colors hover:bg-rose-deep active:scale-[0.98]"
          >
            <ShoppingBag className="size-4" /> Adicionar
          </button>
        </div>
      </div>
    </article>
  );
}

function ChipRow({
  label,
  options,
  value,
  onSelect,
}: {
  label: string;
  options: string[];
  value: string | null;
  onSelect: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[10px] font-bold tracking-wide text-muted-foreground uppercase">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onSelect(opt)}
            className={cn(
              "min-h-9 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
              value === opt
                ? "border-rose-deep bg-accent text-rose-deep"
                : "border-border bg-white text-ink hover:bg-accent/60",
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
