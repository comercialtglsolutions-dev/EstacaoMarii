import type { CartItem, Mode, Product } from "./types";
import { unitPrice } from "./pricing";

export interface CartLine {
  item: CartItem;
  product: Product;
  unit: number;
  whole: boolean;
  lineTotal: number;
}

export interface CartTotals {
  lines: CartLine[];
  subtotal: number;
  /** Economia em relação ao preço de varejo cheio. */
  savings: number;
  count: number;
}

export function computeTotals(
  items: CartItem[],
  menu: Product[],
  mode: Mode,
): CartTotals {
  const lines: CartLine[] = [];
  let subtotal = 0;
  let retailRef = 0;
  let count = 0;

  for (const item of items) {
    const product = menu.find((m) => m.id === item.id);
    if (!product) continue;
    const up = unitPrice(product, item.qty, mode);
    const lineTotal = up.price * item.qty;
    subtotal += lineTotal;
    retailRef += product.priceR * item.qty;
    count += item.qty;
    lines.push({
      item,
      product,
      unit: up.price,
      whole: up.whole,
      lineTotal,
    });
  }

  return { lines, subtotal, savings: retailRef - subtotal, count };
}
