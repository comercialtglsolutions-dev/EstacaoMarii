"use client";

import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { brl } from "@/lib/format";
import { computeTotals } from "@/lib/cart";
import { useCartStore } from "@/store/useCartStore";
import { useMenuStore } from "@/store/useMenuStore";
import { useModeStore } from "@/store/useModeStore";
import { useMounted } from "@/lib/use-mounted";

export function FloatingCartBar() {
  const mounted = useMounted();
  const items = useCartStore((s) => s.items);
  const menu = useMenuStore((s) => s.menu);
  const mode = useModeStore((s) => s.mode);

  if (!mounted || items.length === 0) return null;

  const { subtotal, count } = computeTotals(items, menu, mode);

  return (
    <div className="pb-safe pointer-events-none fixed inset-x-0 bottom-[60px] z-30 px-4 md:hidden">
      <Link
        href="/cart"
        className="pointer-events-auto mx-auto flex max-w-md items-center justify-between gap-3 rounded-2xl bg-ink px-4 py-3 text-white shadow-[0_12px_30px_-8px_rgba(35,32,43,0.6)] active:scale-[0.99]"
      >
        <span className="flex items-center gap-2.5">
          <span className="relative">
            <ShoppingBag className="size-5" />
            <span className="absolute -top-2 -right-2 inline-flex min-w-[16px] items-center justify-center rounded-full bg-rose px-1 text-[10px] font-bold">
              {count}
            </span>
          </span>
          <span className="text-sm font-semibold">Ver carrinho</span>
        </span>
        <span className="flex items-center gap-2 text-sm font-bold">
          {brl(subtotal)}
          <ArrowRight className="size-4" />
        </span>
      </Link>
    </div>
  );
}
