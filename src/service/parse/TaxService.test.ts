import { TaxService } from "./TaxService";

describe("TaxService", () => {
  test("when the product is not imported and does not have a basic-tax, it should be empty", () => {
    const tax = TaxService.findTax("book");
    expect(tax).toEqual([]);
  });

  test("when the product is not imported and have a basic-tax, it should be BASIC", () => {
    const tax = TaxService.findTax("other");
    expect(tax).toEqual(["BASIC"]);
  });

  test("when the product is imported and does not have a basic-tax, it should be IMPORT", () => {
    const tax = TaxService.findTax("imported book");
    expect(tax).toEqual(["IMPORT"]);
  });

  test("when the product is imported and have a basic-tax, it should be BASIC and IMPORT", () => {
    const tax = TaxService.findTax("imported box of other");
    expect(tax).toEqual(["BASIC", "IMPORT"]);
  });
});
