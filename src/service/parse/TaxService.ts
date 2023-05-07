import { TaxType } from "../../model/TaxModel";

const EXCEPT_BASIC_TAX = ["book", "chocolate", "headache"];
const IMPORT_DUTY_TAX = ["imported"];

export class TaxService {
  static findTax(name: string): TaxType[] {
    var result: TaxType[] = ["BASIC"];

    EXCEPT_BASIC_TAX.forEach((typeOfProduct) => {
      if (name.includes(typeOfProduct)) {
        result = result.filter((tax) => tax !== "BASIC");
      }
    });
    IMPORT_DUTY_TAX.forEach((typeOfProduct) => {
      if (name.includes(typeOfProduct)) {
        result.push("IMPORT");
      }
    });
    return result;
  }
}
