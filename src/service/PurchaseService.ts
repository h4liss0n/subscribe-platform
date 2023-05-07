import { Basket, BasketProduct } from "../model/BasketModel";
import { Product } from "../model/ProductModel";
import { arroundNumber, trunkCurrency } from "../utils/UtilsMath";
import { TaxService } from "./TaxService";

export class PurchaseService {
  items: BasketProduct[] = [];

  add(product: Product) {
    const tax = TaxService.findTax(product.name)
    const subTotal = product.quantity * product.price
    const basicTax =  arroundNumber((subTotal * tax.basicTax) / 100)
    const importTax =  arroundNumber(arroundNumber((product.price * tax.importTax) / 100) * product.quantity)
    const salesTaxes =  arroundNumber(importTax + basicTax)
    

    const total = trunkCurrency(subTotal + salesTaxes)
    const item: BasketProduct = {
      id: "",
      product,
      total,  
      salesTaxes,
      importTax,
      basicTax
    };
    this.items.push(item);
  }

  getTotal(): number {
    return this.items.reduce((acc, c) => {
      acc += c.total;
      return acc;
    }, 0);
  }

  getSalesTaxes(): number {
    return arroundNumber(this.items.reduce((acc, c) => {
      acc += c.salesTaxes;
      return acc;
    }, 0));
  }

  getBasket() : Basket {
    return {
      id: "",
      product: this.items,
      salesTaxes: this.getSalesTaxes(),
      total: this.getTotal(),
    }
  }
}
