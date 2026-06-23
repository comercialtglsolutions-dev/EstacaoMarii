"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Store, ShoppingBag, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { useMounted } from "@/lib/use-mounted";

const ITEMS = [
  { href: "/", label: "Catálogo", icon: Store },
  { href: "/cart", label: "Carrinho", icon: ShoppingBag },
  { href: "/admin", label: "Admin", icon: LayoutDashboard },
];

export function BottomNav() {
  const pathname = usePathname();
  const mounted = useMounted();
  const count = useCartStore((s) => s.items.reduce((n, c) => n + c.qty, 0));

  return (
    <nav className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md items-stretch justify-around">
        {ITEMS.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-semibold transition-colors",
                active ? "text-rose-deep" : "text-muted-foreground",
              )}
            >
              <span className="relative">
                <Icon
                  className={cn("size-6", active && "fill-rose-deep/10")}
                  strokeWidth={active ? 2.4 : 2}
                />
                {href === "/cart" && mounted && count > 0 && (
                  <span className="absolute -top-2 -right-2.5 inline-flex min-w-[18px] items-center justify-center rounded-full bg-rose-deep px-1 text-[10px] font-bold text-white">
                    {count}
                  </span>
                )}
              </span>
              {label}
              {active && (
                <span className="absolute top-0 h-0.5 w-8 rounded-full bg-rose-deep" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
