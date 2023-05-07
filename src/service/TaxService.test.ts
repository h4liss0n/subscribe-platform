import { TaxService } from "./TaxService";

describe("TaxService", () => {
  test("Basic tax for non-imported book should be zero", () => {
    const tax = TaxService.findTax("book");
    expect(tax).toEqual({ basic: 0, import: 0 });
  });

  test("Basic tax for imported book should be zero and import tax should be 5", () => {
    const tax = TaxService.findTax("imported book");
    expect(tax).toEqual({ basic: 0, import: 5 });
  });

  test("Basic sales tax for imported box of chocolates should be zero and import tax should be 5", () => {
    const tax = TaxService.findTax("imported box of chocolates");
    expect(tax).toEqual({ basic: 0, import: 5 });
  });

  test("Basic tax for imported product that is not food should be 10 and import tax should be 5", () => {
    const tax = TaxService.findTax("imported box of other");
    expect(tax).toEqual({ basic: 10, import: 5 });
  });
});
