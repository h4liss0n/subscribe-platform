import { Product } from "./ProductModel";

export interface Basket {  
  product: BasketProduct[];
  total: number;
  salesTaxes: number;
}

export interface BasketProduct {  
  product: Product;
  total: number;
  salesTaxes: number;
}
