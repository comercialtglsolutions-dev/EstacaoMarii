export type Category = "Embalagens" | "Presentes" | "Decorações" | "Sazonais";

export type Mode = "varejo" | "atacado";

export interface Product {
  id: string;
  name: string;
  cat: Category;
  desc: string;
  /** Preço de varejo (unitário) */
  priceR: number;
  /** Preço de atacado (unitário); 0 = sem atacado */
  priceW: number;
  /** Quantidade mínima para acionar o atacado automaticamente; 0 = desativado */
  wholeMin: number;
  sizes: string[];
  colors: string[];
  emoji: string;
  /** Selo sazonal opcional (ex.: "Natal") */
  season: string;
}

export interface CartItem {
  /** chave única: `${id}|${size}|${color}` */
  key: string;
  id: string;
  size: string | null;
  color: string | null;
  qty: number;
}
