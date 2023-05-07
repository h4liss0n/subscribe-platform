import { Product } from "../model/ProductModel";

const regexQuantity = /^(\d+)/;
const regexName = /\s([a-z\s]+)\s+at\s+/i;
const regexPrice = /at\s+(\d+\.\d{2})$/;

export class ParseService {
  static parseToProduct(text: string): Product[] {
    const lines = text.trim().split("\n");    
    return lines.map((line) => {      
      const quantity = parseInt(regexQuantity.exec(line)[1], 10);
      const name = regexName.exec(line)[1];
      const price = parseFloat(regexPrice.exec(line)[1]);      
      return {
        quantity,
        name,        
        price,       
      };
    });
  }
}
