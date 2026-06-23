"use client";

import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/lib/data";

const TABS = ["Todos", ...CATEGORIES] as const;

export function CategoryTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (cat: string) => void;
}) {
  return (
    <div className="no-scrollbar -mx-4 flex snap-x gap-2 overflow-x-auto px-4 md:mx-0 md:px-0">
      {TABS.map((cat) => {
        const on = active === cat;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onChange(cat)}
            className={cn(
              "snap-start rounded-full border px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors",
              on
                ? "border-ink bg-ink text-white"
                : "border-border bg-white text-ink hover:bg-accent",
            )}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
