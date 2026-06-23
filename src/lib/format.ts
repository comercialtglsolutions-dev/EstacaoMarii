const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

/** Formata um valor numérico como moeda brasileira (ex.: R$ 7,90). */
export function brl(value: number): string {
  return BRL.format(value);
}
