"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { brl } from "@/lib/format";
import { computeTotals } from "@/lib/cart";
import { useCartStore } from "@/store/useCartStore";
import { useMenuStore } from "@/store/useMenuStore";
import { useModeStore } from "@/store/useModeStore";
import { useMounted } from "@/lib/use-mounted";

const PAY_METHODS = [
  { value: "pix", label: "Pix" },
  { value: "cartao", label: "Cartão" },
  { value: "boleto", label: "Boleto (atacado)" },
] as const;

type Pay = (typeof PAY_METHODS)[number]["value"];

export function CartView() {
  const mounted = useMounted();
  const items = useCartStore((s) => s.items);
  const changeQty = useCartStore((s) => s.changeQty);
  const remove = useCartStore((s) => s.remove);
  const clear = useCartStore((s) => s.clear);
  const menu = useMenuStore((s) => s.menu);
  const mode = useModeStore((s) => s.mode);

  const [pay, setPay] = useState<Pay>("pix");
  const [orderNo, setOrderNo] = useState<number | null>(null);

  if (!mounted) {
    return <div className="h-40 animate-pulse rounded-2xl bg-white/60" />;
  }

  const { lines, subtotal, savings } = computeTotals(items, menu, mode);

  function checkout() {
    const n = Math.floor(1000 + Math.random() * 9000);
    clear();
    setOrderNo(n);
  }

  return (
    <div className="flex flex-col gap-5">
      <SectionTitle title="Seu carrinho" />

      {orderNo !== null && (
        <div className="flex items-start gap-3 rounded-2xl border border-sage/40 bg-[#eef5f0] p-4 text-sm text-[#2f4d3a]">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-sage" />
          <div>
            <p className="font-semibold">
              Pedido simulado #{orderNo} criado — pagamento via{" "}
              {PAY_METHODS.find((p) => p.value === pay)?.label}.
            </p>
            <p className="mt-1 text-[#3f5d4a]">
              Em produção, este passo dispararia a cobrança real e enviaria o
              pedido ao painel da loja (com cálculo de frete e baixa de estoque).
            </p>
            <Link
              href="/"
              className="mt-3 inline-block font-semibold text-sage underline"
            >
              Voltar ao catálogo
            </Link>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        orderNo === null && (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-white/60 py-16 text-center">
            <ShoppingBag className="size-8 text-muted-foreground/60" />
            <p className="text-sm text-muted-foreground">
              Seu carrinho está vazio. Volte ao catálogo e monte seu pedido 🎀
            </p>
            <Link
              href="/"
              className="rounded-xl bg-ink px-5 py-2.5 text-sm font-bold text-white"
            >
              Ver catálogo
            </Link>
          </div>
        )
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {lines.map(({ item, product, unit, whole, lineTotal }) => {
              const vars = [item.size, item.color].filter(Boolean).join(" · ");
              return (
                <div
                  key={item.key}
                  className="flex items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-foreground/10"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(150deg,#f5e3ec,#eccdd9)] text-2xl">
                    {product.emoji || "📦"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-display truncate text-sm font-semibold text-ink">
                      {product.name}
                    </h4>
                    {vars && (
                      <p className="text-[11px] text-muted-foreground">{vars}</p>
                    )}
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {brl(unit)} cada{" "}
                      {whole && (
                        <span className="font-semibold text-sage">
                          · atacado
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center rounded-lg border border-border">
                      <button
                        type="button"
                        aria-label="Diminuir"
                        onClick={() => changeQty(item.key, -1)}
                        className="flex size-8 items-center justify-center text-muted-foreground active:scale-95"
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-bold tabular-nums">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        aria-label="Aumentar"
                        onClick={() => changeQty(item.key, 1)}
                        className="flex size-8 items-center justify-center text-muted-foreground active:scale-95"
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                    <span className="text-sm font-bold tabular-nums">
                      {brl(lineTotal)}
                    </span>
                  </div>
                  <button
                    type="button"
                    aria-label="Remover item"
                    onClick={() => remove(item.key)}
                    className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="rounded-2xl bg-ink p-5 text-white md:p-6">
            <Row label="Subtotal" value={brl(subtotal)} />
            {savings > 0.001 && (
              <Row
                label="Economia no atacado"
                value={"- " + brl(savings)}
                className="text-[#a8d0b6]"
              />
            )}
            <Row label="Frete" value="A combinar" />
            <div className="mt-2 flex items-center justify-between border-t border-white/15 pt-3 text-xl font-extrabold">
              <span>Total</span>
              <span className="tabular-nums">{brl(subtotal)}</span>
            </div>

            <p className="mt-5 mb-2 text-[11px] tracking-wider text-white/60 uppercase">
              Forma de pagamento
            </p>
            <div className="flex flex-wrap gap-2">
              {PAY_METHODS.map((m) => (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => setPay(m.value)}
                  className={cn(
                    "rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors",
                    pay === m.value
                      ? "border-rose bg-rose/20 text-white"
                      : "border-white/25 text-white/85",
                  )}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={checkout}
              className="mt-5 w-full rounded-xl bg-rose py-3.5 text-[15px] font-extrabold text-white transition-colors hover:bg-rose-deep active:scale-[0.99]"
            >
              Finalizar pedido
            </button>
            <p className="mt-3 text-[11px] leading-relaxed text-white/55">
              ⚠️ Simulação para demonstração. Nenhum pagamento real é processado
              aqui — a cobrança real (Pix/cartão/boleto) exige uma conta de
              gateway (ex.: Mercado Pago) no CNPJ da loja.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <h2 className="font-display text-2xl font-bold text-ink">{title}</h2>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

function Row({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-2 flex items-center justify-between text-sm text-white/80",
        className,
      )}
    >
      <span>{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}
