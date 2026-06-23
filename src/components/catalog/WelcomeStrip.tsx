import { Sparkles, Tag, Boxes, Truck } from "lucide-react";

const FEATURES = [
  { icon: Tag, label: "Varejo & Atacado" },
  { icon: Boxes, label: "Montagem de kits" },
  { icon: Truck, label: "Entrega a combinar" },
];

export function WelcomeStrip() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#a85f83,#c98aa6)] px-5 py-6 text-white shadow-[0_12px_30px_-12px_rgba(168,95,131,0.55)] md:px-8 md:py-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-10 size-44 rounded-full bg-white/10 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-12 left-10 size-40 rounded-full bg-gold/20 blur-2xl"
      />
      <div className="relative">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold tracking-wide uppercase">
          <Sparkles className="size-3.5" /> Loja Estação Marii
        </span>
        <h1 className="font-display mt-3 max-w-md text-2xl leading-tight font-bold md:text-3xl">
          Tudo para embrulhar, presentear e decorar
        </h1>
        <p className="mt-2 max-w-md text-sm text-white/85">
          Escolha o modo de compra, monte seu pedido e finalize em poucos
          toques.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {FEATURES.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/12 px-3 py-1.5 text-xs font-medium text-white/95 ring-1 ring-white/15"
            >
              <Icon className="size-3.5" /> {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
