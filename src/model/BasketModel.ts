import { Product } from "./ProductModel";

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
} 