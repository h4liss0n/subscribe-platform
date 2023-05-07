import * as _ from "lodash";
import { PurchaseService } from "./service/PurchaseService";
import { ReceiptService } from "./service/ReceiptService";
import { ParseService } from "./service/parse/ParseService";

var items = document.getElementById("items") as HTMLTextAreaElement;
var result = document.getElementById("result") as HTMLTextAreaElement;
var addButton = document.getElementById("addButton");
items.value = `1 imported bottle of perfume at 27.99
1 bottle of perfume at 18.99
1 packet of headache pills at 9.75
3 imported boxes of chocolates at 11.25`;

addButton.addEventListener("click", function () {
  const listOfItem = ParseService.parseToProduct(items.value);
  const purchaseService = new PurchaseService();
  listOfItem.forEach((item) => purchaseService.add(item));
  const basket = purchaseService.getBasket();
  result.value = ReceiptService.getPrint(basket);
});
