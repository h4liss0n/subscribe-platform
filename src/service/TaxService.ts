import { TaxModel } from "../model/TaxModel";

const EXCEPT_BASIC_TAX = ["book", "chocolate", "headache"];
const IMPORT_DUTY_TAX = ["imported"];

export class TaxService {
  static findTax(name: string): TaxModel {
    var result: TaxModel = {
      basicTax: 10,
      importTax: 0,
    };

    EXCEPT_BASIC_TAX.forEach((typeOfProduct) => {
      if (name.includes(typeOfProduct)) {
        result = {
          ...result,
          basicTax: 0,         
        };
      }
    });
    IMPORT_DUTY_TAX.forEach((typeOfProduct) => {
      if (name.includes(typeOfProduct)) {
        result = {
          ...result,
          importTax: 5,          
        };
      }
    });
    return result;
  }
}
