import { TaxService } from "./TaxService";

describe("TaxService", () => {
  it("TaxService - when the product is a book and not imported, it should be basic sales tax zero", () => {
    const tax = TaxService.findTax("book");
    expect(tax).toEqual({ basicTax: 0, importTax: 0 });
  });

  it("TaxService - when the product is a book and imported, it should be basic sales tax zero", () => {
    const tax = TaxService.findTax("book imported");
    expect(tax).toEqual({ basicTax: 0, importTax: 5 });
  });  

  it("TaxService - when the product is a box of chocolates and imported, it should be basic sales tax zero", () => {
    const tax = TaxService.findTax("imported box of chocolates");
    expect(tax).toEqual({ basicTax: 0, importTax: 5 });
  });

});
