import type { Mode, Product } from "./types";

export interface UnitPrice {
  price: number;
  whole: boolean;
}

/**
 * Preço unitário de um item respeitando o modo de compra e o limiar de atacado.
 * Mesma regra do app original: atacado é aplicado quando o modo é "atacado"
 * OU quando a quantidade atinge o mínimo de atacado do produto.
 */
export function unitPrice(item: Product, qty: number, mode: Mode): UnitPrice {
  const wholeActive =
    mode === "atacado" || (item.wholeMin > 0 && qty >= item.wholeMin);
  if (wholeActive && item.priceW > 0) {
    return { price: item.priceW, whole: true };
  }
  return { price: item.priceR, whole: false };
}
