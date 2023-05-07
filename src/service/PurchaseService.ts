import { Basket, BasketProduct } from "../model/BasketModel";
import { Product } from "../model/ProductModel";
import { RATE_BASIC, RATE_IMPORT } from "../model/TaxModel";
import { roundUp, trunkCurrency } from "../utils/UtilsMath";

export class PurchaseService {
  items: BasketProduct[] = [];

  add(product: Product) {
    var basicTax = 0;
    var importTax = 0;
    const subTotal = product.quantity * product.price;

    if (product.taxTypes.includes("BASIC")) {
      basicTax = roundUp((subTotal * RATE_BASIC) / 100);
    }
    if (product.taxTypes.includes("IMPORT")) {
      importTax = roundUp(
        roundUp((product.price * RATE_IMPORT) / 100) * product.quantity
      );
    }

    const salesTaxes = roundUp(importTax + basicTax);
    const total = trunkCurrency(subTotal + salesTaxes);
    const item: BasketProduct = {      
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
      product: this.items,
      salesTaxes: this.getSalesTaxes(),
      total: this.getTotal(),
    };
  }
}
