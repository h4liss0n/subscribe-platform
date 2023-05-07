import { TaxType } from "./TaxModel";

export interface Product {
  quantity: number;
  name: string;
  price: number;
  taxTypes: TaxType[];
}
