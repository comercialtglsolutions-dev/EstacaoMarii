"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus, BadgeCheck } from "lucide-react";
import { toast } from "sonner";
import { brl } from "@/lib/format";
import { CATEGORIES } from "@/lib/data";
import type { Category } from "@/lib/types";
import { useMenuStore, type ProductInput } from "@/store/useMenuStore";
import { useMounted } from "@/lib/use-mounted";

interface FormState {
  name: string;
  cat: Category;
  desc: string;
  priceR: string;
  priceW: string;
  wholeMin: string;
  sizes: string;
  colors: string;
  emoji: string;
  season: string;
}

const EMPTY: FormState = {
  name: "",
  cat: CATEGORIES[0],
  desc: "",
  priceR: "",
  priceW: "",
  wholeMin: "",
  sizes: "",
  colors: "",
  emoji: "",
  season: "",
};

function parseList(v: string): string[] {
  return v
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function AdminView() {
  const mounted = useMounted();
  const menu = useMenuStore((s) => s.menu);
  const addProduct = useMenuStore((s) => s.addProduct);
  const updateProduct = useMenuStore((s) => s.updateProduct);
  const removeProduct = useMenuStore((s) => s.removeProduct);

  const [form, setForm] = useState<FormState>(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function reset() {
    setForm(EMPTY);
    setEditingId(null);
  }

  function loadIntoForm(id: string) {
    const i = menu.find((m) => m.id === id);
    if (!i) return;
    setEditingId(id);
    setForm({
      name: i.name,
      cat: i.cat,
      desc: i.desc,
      priceR: String(i.priceR),
      priceW: i.priceW ? String(i.priceW) : "",
      wholeMin: i.wholeMin ? String(i.wholeMin) : "",
      sizes: i.sizes.join(", "),
      colors: i.colors.join(", "),
      emoji: i.emoji,
      season: i.season,
    });
    if (typeof window !== "undefined")
      window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function save() {
    const name = form.name.trim();
    const priceR = parseFloat(form.priceR);
    if (!name || isNaN(priceR)) {
      toast.error("Preencha pelo menos nome e preço de varejo.");
      return;
    }
    const data: ProductInput = {
      name,
      cat: form.cat,
      desc: form.desc.trim(),
      priceR,
      priceW: parseFloat(form.priceW) || 0,
      wholeMin: parseInt(form.wholeMin) || 0,
      sizes: parseList(form.sizes),
      colors: parseList(form.colors),
      emoji: form.emoji.trim() || "📦",
      season: form.season.trim(),
    };
    if (editingId) {
      updateProduct(editingId, data);
      toast.success("Produto atualizado.");
    } else {
      addProduct(data);
      toast.success("Produto adicionado.");
    }
    reset();
  }

  function del(id: string) {
    if (!confirm("Excluir este produto?")) return;
    removeProduct(id);
    if (editingId === id) reset();
    toast.success("Produto excluído.");
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <h2 className="font-display text-2xl font-bold text-ink">
          Painel de produtos
        </h2>
        <span className="h-px flex-1 bg-border" />
        <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[11px] font-bold text-rose-deep uppercase">
          <BadgeCheck className="size-3.5" /> Admin
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-[360px_1fr] md:items-start">
        {/* Formulário */}
        <div className="flex flex-col gap-3 rounded-2xl bg-white p-5 ring-1 ring-foreground/10 md:sticky md:top-24">
          <h3 className="font-display text-base font-semibold text-ink">
            {editingId ? "Editar produto" : "Novo produto"}
          </h3>

          <Field label="Nome">
            <Input
              value={form.name}
              onChange={(v) => set("name", v)}
              placeholder="Ex: Caixa kraft para presente"
            />
          </Field>

          <Field label="Categoria">
            <select
              value={form.cat}
              onChange={(e) => set("cat", e.target.value as Category)}
              className="h-11 rounded-xl border border-input bg-white px-3 text-sm outline-none focus:border-rose"
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>

          <Field label="Descrição">
            <textarea
              value={form.desc}
              onChange={(e) => set("desc", e.target.value)}
              placeholder="Ex: Caixa rígida com tampa, ideal para kits"
              className="min-h-[60px] resize-y rounded-xl border border-input bg-white px-3 py-2.5 text-sm outline-none focus:border-rose"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Preço varejo (R$)">
              <Input
                type="number"
                value={form.priceR}
                onChange={(v) => set("priceR", v)}
                placeholder="0.00"
              />
            </Field>
            <Field label="Preço atacado (R$)">
              <Input
                type="number"
                value={form.priceW}
                onChange={(v) => set("priceW", v)}
                placeholder="0.00"
              />
            </Field>
          </div>

          <Field label="Atacado a partir de (qtd)">
            <Input
              type="number"
              value={form.wholeMin}
              onChange={(v) => set("wholeMin", v)}
              placeholder="Ex: 12"
            />
          </Field>
          <p className="-mt-1 text-[11px] leading-relaxed text-muted-foreground">
            Ao atingir essa quantidade do item, o preço de atacado é aplicado
            automaticamente.
          </p>

          <Field label="Tamanhos (separe por vírgula)">
            <Input
              value={form.sizes}
              onChange={(v) => set("sizes", v)}
              placeholder="Ex: P, M, G"
            />
          </Field>
          <Field label="Cores / temas (separe por vírgula)">
            <Input
              value={form.colors}
              onChange={(v) => set("colors", v)}
              placeholder="Ex: Kraft, Branco, Natal"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Emoji">
              <Input
                value={form.emoji}
                onChange={(v) => set("emoji", v.slice(0, 2))}
                placeholder="📦"
              />
            </Field>
            <Field label="Selo sazonal">
              <Input
                value={form.season}
                onChange={(v) => set("season", v)}
                placeholder="Ex: Natal"
              />
            </Field>
          </div>

          <button
            type="button"
            onClick={save}
            className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-rose-deep py-3 text-sm font-bold text-white transition-colors hover:bg-rose-deep/90 active:scale-[0.99]"
          >
            <Plus className="size-4" />
            {editingId ? "Salvar alterações" : "Salvar produto"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={reset}
              className="text-xs font-medium text-muted-foreground underline"
            >
              Cancelar edição
            </button>
          )}
        </div>

        {/* Lista */}
        <div className="flex flex-col gap-2.5">
          {!mounted ? (
            <div className="h-40 animate-pulse rounded-2xl bg-white/60" />
          ) : (
            menu.map((i) => (
              <div
                key={i.id}
                className="flex items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-foreground/10"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(150deg,#f5e3ec,#eccdd9)] text-xl">
                  {i.emoji || "📦"}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <h4 className="font-display truncate text-sm font-semibold text-ink">
                      {i.name}
                    </h4>
                    {i.season && (
                      <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-rose-deep uppercase">
                        {i.season}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground">{i.cat}</p>
                  <p className="mt-0.5 text-xs font-semibold text-ink">
                    {brl(i.priceR)}
                    {i.priceW > 0 && (
                      <span className="ml-1.5 font-medium text-sage">
                        atac. {brl(i.priceW)}
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button
                    type="button"
                    aria-label="Editar"
                    onClick={() => loadIntoForm(i.id)}
                    className="flex size-9 items-center justify-center rounded-lg text-rose-deep transition-colors hover:bg-accent"
                  >
                    <Pencil className="size-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Excluir"
                    onClick={() => del(i.id)}
                    className="flex size-9 items-center justify-center rounded-lg text-destructive transition-colors hover:bg-destructive/10"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[10px] font-bold tracking-wide text-muted-foreground uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      step={type === "number" ? "0.01" : undefined}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="h-11 rounded-xl border border-input bg-white px-3 text-sm outline-none focus:border-rose"
    />
  );
}
