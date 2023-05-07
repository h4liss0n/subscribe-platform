import { Basket, BasketProduct } from "../model/BasketModel";
import { Product } from "../model/ProductModel";
import { roundUp, trunkCurrency } from "../utils/UtilsMath";
import { TaxService } from "./TaxService";

export class PurchaseService {
  items: BasketProduct[] = [];

  add(product: Product) {
    const tax = TaxService.findTax(product.name);
    const subTotal = product.quantity * product.price;
    const basicTax = roundUp((subTotal * tax.basic) / 100);
    const importTax = roundUp(
      roundUp((product.price * tax.import) / 100) * product.quantity
    );
    const salesTaxes = roundUp(importTax + basicTax);
    const total = trunkCurrency(subTotal + salesTaxes);
    const item: BasketProduct = {
      id: "",
      product,
      total,
      salesTaxes,
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
    return roundUp(
      this.items.reduce((acc, c) => {
        acc += c.salesTaxes;
        return acc;
      }, 0)
    );
  }

  getBasket(): Basket {
    return {
      id: "",
      product: this.items,
      salesTaxes: this.getSalesTaxes(),
      total: this.getTotal(),
    };
  }
}
