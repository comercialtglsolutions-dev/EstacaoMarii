"use client";

import { useState } from "react";
import { PackageOpen } from "lucide-react";
import { WelcomeStrip } from "./WelcomeStrip";
import { ModeToggle } from "./ModeToggle";
import { CategoryTabs } from "./CategoryTabs";
import { ProductCard } from "./ProductCard";
import { FloatingCartBar } from "./FloatingCartBar";
import { useMenuStore } from "@/store/useMenuStore";

export function CatalogView() {
  const menu = useMenuStore((s) => s.menu);
  const [activeCat, setActiveCat] = useState("Todos");

  const items =
    activeCat === "Todos" ? menu : menu.filter((i) => i.cat === activeCat);

  return (
    <div className="flex flex-col gap-5">
      <WelcomeStrip />
      <ModeToggle />
      <CategoryTabs active={activeCat} onChange={setActiveCat} />

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-white/60 py-16 text-center text-muted-foreground">
          <PackageOpen className="size-8 opacity-60" />
          <p className="text-sm">Nenhum produto nessa categoria ainda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      <FloatingCartBar />
    </div>
  );
}
