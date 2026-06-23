"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { useMounted } from "@/lib/use-mounted";

const NAV = [
  { href: "/", label: "Catálogo" },
  { href: "/cart", label: "Carrinho" },
  { href: "/admin", label: "Painel Admin" },
];

export function Header() {
  const pathname = usePathname();
  const mounted = useMounted();
  const count = useCartStore((s) => s.items.reduce((n, c) => n + c.qty, 0));

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-[linear-gradient(120deg,#ffffff,#f6e9f0)]/95 backdrop-blur supports-[backdrop-filter]:bg-[linear-gradient(120deg,#ffffff,#f6e9f0)]/80">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-3 md:px-6 md:py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="relative flex size-11 shrink-0 items-center justify-center rounded-[14px] bg-[linear-gradient(150deg,var(--rose),var(--rose-deep))] text-2xl text-white shadow-[0_4px_14px_rgba(168,95,131,0.35)]">
            <span
              aria-hidden
              className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 bg-gold/85"
            />
            <span className="relative">🎁</span>
          </span>
          <span className="leading-none">
            <span className="font-display block text-xl font-bold text-ink md:text-2xl">
              Estação Marii
            </span>
            <span className="mt-1 block text-[10px] font-semibold tracking-[0.16em] text-rose-deep uppercase">
              Embalagens · Presentes · Decorações
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1.5 md:flex">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                  active
                    ? "border-rose-deep bg-rose-deep text-white"
                    : "border-border bg-white text-ink hover:bg-accent",
                )}
              >
                {item.label}
                {item.href === "/cart" && mounted && count > 0 && (
                  <span
                    className={cn(
                      "ml-2 inline-flex min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-bold",
                      active ? "bg-white text-rose-deep" : "bg-rose-deep text-white",
                    )}
                  >
                    {count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="h-1.5 bg-[repeating-linear-gradient(90deg,var(--rose)_0_30px,var(--gold)_30px_60px,var(--sage)_60px_90px)]" />
    </header>
  );
}
