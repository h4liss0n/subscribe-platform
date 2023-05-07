import { Product } from "../model/ProductModel";

const REGEX_QUANTITY = /^(\d+)/;
const REGEX_NAME = /\s([a-z\s]+)\s+at\s+/i;
const REGEX_PRICE = /at\s+(\d+\.\d{2})$/;

export class ParseService {
  static parseToProduct(text: string): Product[] {
    const lines = text.trim().split("\n");
    return lines.map((line) => {
      const quantity = parseInt(REGEX_QUANTITY.exec(line)[1], 10);
      const name = REGEX_NAME.exec(line)[1];
      const price = parseFloat(REGEX_PRICE.exec(line)[1]);
      return {
        quantity,
        name,
        price,
      };
    });
  }
}
