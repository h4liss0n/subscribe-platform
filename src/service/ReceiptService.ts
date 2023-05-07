
import { Basket } from "../model/BasketModel";
import { formattedValue } from "../utils/UtilsMath";

export class ReceiptService {
  static getPrint(basket: Basket): string {    
  var text: string = "";
  basket.product.forEach((item) => {   
    const { product: {quantity, name }} = item 
    text += `${formattedValue(quantity)} ${name}: ${formattedValue(item.total)}\n`;
  });
  text += `Sales Taxes: ${formattedValue(basket.salesTaxes)} \n`;
  text += `Total: ${formattedValue(basket.total)} \n`;
  return text
  }
}