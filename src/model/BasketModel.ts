import { Product } from "./ProductModel";
import { TaxModel } from "./TaxModel";

export interface Basket {
  id: string;  
  product: BasketProduct[]  
  total: number,
  salesTaxes: number
} 

export interface BasketProduct {
  id: string;
  product: Product  
  total: number
  salesTaxes: number
  importTax: number
  basicTax: number
} 