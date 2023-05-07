import { Product } from "../model/ProductModel";
import { PurchaseService } from "./PurchaseService";

describe("PurchaseService", () => {
  test("should calculate the correct sales taxes and total for case 1", () => {
    const purchaseService = new PurchaseService();
    const item1: Product = {
      name: "book",
      quantity: 2,
      price: 12.49,
      taxTypes: [],
    };
    const item2: Product = {
      name: "chocolate bar",
      quantity: 1,
      price: 0.85,
      taxTypes: [],
    };
    const item3: Product = {
      name: "music CD",
      quantity: 1,
      price: 14.99,
      taxTypes: ["BASIC"],
    };

    purchaseService.add(item1);
    purchaseService.add(item2);
    purchaseService.add(item3);

    expect(purchaseService.getSalesTaxes()).toEqual(1.5);
    expect(purchaseService.getTotal()).toEqual(42.32);
  });

  test("should calculate the correct sales taxes and total for case 2", () => {
    const purchaseService = new PurchaseService();
    const item1: Product = {
      name: "imported box of chocolates",
      quantity: 1,
      price: 10,
      taxTypes: ["IMPORT"],
    };
    const item2: Product = {
      name: "imported bottle of perfume",
      quantity: 1,
      price: 47.5,
      taxTypes: ["IMPORT", "BASIC"],
    };

    purchaseService.add(item1);
    purchaseService.add(item2);

    expect(purchaseService.getSalesTaxes()).toEqual(7.65);
    expect(purchaseService.getTotal()).toEqual(65.15);
  });

  test("should calculate the correct sales taxes and total for case 3", () => {
    const purchaseService = new PurchaseService();
    const item1: Product = {
      name: "imported bottle of perfume",
      quantity: 1,
      price: 27.99,
      taxTypes: ["IMPORT", "BASIC"],
    };
    const item2: Product = {
      name: "bottle of perfume",
      quantity: 1,
      price: 18.99,
      taxTypes: ["BASIC"],
    };
    const item3: Product = {
      name: "packet of headache pills",
      quantity: 1,
      price: 9.75,
      taxTypes: [],
    };
    const item4: Product = {
      name: "imported box of chocolates",
      quantity: 3,
      price: 11.25,
      taxTypes: ["IMPORT"],
    };

    purchaseService.add(item1);
    purchaseService.add(item2);
    purchaseService.add(item3);
    purchaseService.add(item4);

    expect(purchaseService.getSalesTaxes()).toEqual(7.9);
    expect(purchaseService.getTotal()).toEqual(98.38);
  });
});
