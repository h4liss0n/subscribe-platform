import { Product } from "../model/ProductModel";
import { PurchaseService } from "./PurchaseService";

describe("PurchaseService", () => {
  it("PurchaseService - case 1", () => {
    const purchaseService = new PurchaseService();
    const item1: Product = {
      name: "book",
      quantity: 2,
      price: 12.49,
    };
    const item2: Product = {
      name: "chocolate bar",
      quantity: 1,
      price: 0.85,
    };
    const item3: Product = {
      name: "music CD",
      quantity: 1,
      price: 14.99,
    };

    purchaseService.add(item1);
    purchaseService.add(item2); 
    purchaseService.add(item3);
    
    expect(purchaseService.getSalesTaxes()).toEqual(1.50);
    expect(purchaseService.getTotal()).toEqual(42.32);
  });

  it("PurchaseService - case 2", () => {
    const purchaseService = new PurchaseService();
    const item1: Product = {
      name: "imported box of chocolates",
      quantity: 1,
      price: 10,
    };
    const item2: Product = {
      name: "imported bottle of perfume",
      quantity: 1,
      price: 47.50,
    };

    purchaseService.add(item1);
    purchaseService.add(item2);     

    expect(purchaseService.getSalesTaxes()).toEqual(7.65);
    expect(purchaseService.getTotal()).toEqual(65.15);
  });


  it("PurchaseService - case 1", () => {
    const purchaseService = new PurchaseService();
    const item1: Product = {
      name: "imported bottle of perfume",
      quantity: 1,
      price: 27.99,
    };
    const item2: Product = {
      name: "bottle of perfume at",
      quantity: 1,
      price: 18.99,
    };
    const item3: Product = {
      name: "packet of headache pills at",
      quantity: 1,
      price: 9.75,
    };
    const item4: Product = {
      name: "imported boxes of chocolates",
      quantity: 3,
      price: 11.25,
    };

    purchaseService.add(item1);
    purchaseService.add(item2); 
    purchaseService.add(item3);
    purchaseService.add(item4);
    
     expect(purchaseService.getSalesTaxes()).toEqual(7.90);
    expect(purchaseService.getTotal()).toEqual(98.38);
  });



});
