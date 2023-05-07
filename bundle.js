/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/service/ParseService.ts":
/*!*************************************!*\
  !*** ./src/service/ParseService.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParseService": () => (/* binding */ ParseService)
/* harmony export */ });
var regexQuantity = /^(\d+)/;
var regexName = /\s([a-z\s]+)\s+at\s+/i;
var regexPrice = /at\s+(\d+\.\d{2})$/;
var ParseService = /** @class */ (function () {
    function ParseService() {
    }
    ParseService.parseToProduct = function (text) {
        var lines = text.trim().split("\n");
        return lines.map(function (line) {
            var quantity = parseInt(regexQuantity.exec(line)[1], 10);
            var name = regexName.exec(line)[1];
            var price = parseFloat(regexPrice.exec(line)[1]);
            return {
                quantity: quantity,
                name: name,
                price: price,
            };
        });
    };
    return ParseService;
}());



/***/ }),

/***/ "./src/service/PurchaseService.ts":
/*!****************************************!*\
  !*** ./src/service/PurchaseService.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PurchaseService": () => (/* binding */ PurchaseService)
/* harmony export */ });
/* harmony import */ var _utils_UtilsMath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/UtilsMath */ "./src/utils/UtilsMath.ts");
/* harmony import */ var _TaxService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TaxService */ "./src/service/TaxService.ts");


var PurchaseService = /** @class */ (function () {
    function PurchaseService() {
        this.items = [];
    }
    PurchaseService.prototype.add = function (product) {
        var tax = _TaxService__WEBPACK_IMPORTED_MODULE_1__.TaxService.findTax(product.name);
        var subTotal = product.quantity * product.price;
        var basicTax = (0,_utils_UtilsMath__WEBPACK_IMPORTED_MODULE_0__.arroundNumber)((subTotal * tax.basicTax) / 100);
        var importTax = (0,_utils_UtilsMath__WEBPACK_IMPORTED_MODULE_0__.arroundNumber)((0,_utils_UtilsMath__WEBPACK_IMPORTED_MODULE_0__.arroundNumber)((product.price * tax.importTax) / 100) * product.quantity);
        var salesTaxes = (0,_utils_UtilsMath__WEBPACK_IMPORTED_MODULE_0__.arroundNumber)(importTax + basicTax);
        var total = (0,_utils_UtilsMath__WEBPACK_IMPORTED_MODULE_0__.trunkCurrency)(subTotal + salesTaxes);
        var item = {
            id: "",
            product: product,
            total: total,
            salesTaxes: salesTaxes,
            importTax: importTax,
            basicTax: basicTax
        };
        this.items.push(item);
    };
    PurchaseService.prototype.getTotal = function () {
        return this.items.reduce(function (acc, c) {
            acc += c.total;
            return acc;
        }, 0);
    };
    PurchaseService.prototype.getSalesTaxes = function () {
        return (0,_utils_UtilsMath__WEBPACK_IMPORTED_MODULE_0__.arroundNumber)(this.items.reduce(function (acc, c) {
            acc += c.salesTaxes;
            return acc;
        }, 0));
    };
    PurchaseService.prototype.getBasket = function () {
        return {
            id: "",
            product: this.items,
            salesTaxes: this.getSalesTaxes(),
            total: this.getTotal(),
        };
    };
    return PurchaseService;
}());



/***/ }),

/***/ "./src/service/ReceiptService.ts":
/*!***************************************!*\
  !*** ./src/service/ReceiptService.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReceiptService": () => (/* binding */ ReceiptService)
/* harmony export */ });
/* harmony import */ var _utils_UtilsMath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/UtilsMath */ "./src/utils/UtilsMath.ts");

var ReceiptService = /** @class */ (function () {
    function ReceiptService() {
    }
    ReceiptService.getPrint = function (basket) {
        var text = "";
        basket.product.forEach(function (item) {
            var _a = item.product, quantity = _a.quantity, name = _a.name;
            text += "".concat((0,_utils_UtilsMath__WEBPACK_IMPORTED_MODULE_0__.formattedValue)(quantity), " ").concat(name, ": ").concat((0,_utils_UtilsMath__WEBPACK_IMPORTED_MODULE_0__.formattedValue)(item.total), "  |  ").concat(item.importTax, " |  ").concat(item.basicTax, "        \n");
        });
        text += " Sales Taxes: ".concat((0,_utils_UtilsMath__WEBPACK_IMPORTED_MODULE_0__.formattedValue)(basket.salesTaxes), " \n");
        text += " Total: ".concat((0,_utils_UtilsMath__WEBPACK_IMPORTED_MODULE_0__.formattedValue)(basket.total), " \n");
        return text;
    };
    return ReceiptService;
}());



/***/ }),

/***/ "./src/service/TaxService.ts":
/*!***********************************!*\
  !*** ./src/service/TaxService.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TaxService": () => (/* binding */ TaxService)
/* harmony export */ });
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var EXCEPT_BASIC_TAX = ["book", "chocolate", "headache"];
var IMPORT_DUTY_TAX = ["imported"];
var TaxService = /** @class */ (function () {
    function TaxService() {
    }
    TaxService.findTax = function (name) {
        var result = {
            basicTax: 10,
            importTax: 0,
        };
        EXCEPT_BASIC_TAX.forEach(function (typeOfProduct) {
            if (name.includes(typeOfProduct)) {
                result = __assign(__assign({}, result), { basicTax: 0 });
            }
        });
        IMPORT_DUTY_TAX.forEach(function (typeOfProduct) {
            if (name.includes(typeOfProduct)) {
                result = __assign(__assign({}, result), { importTax: 5 });
            }
        });
        return result;
    };
    return TaxService;
}());



/***/ }),

/***/ "./src/utils/UtilsMath.ts":
/*!********************************!*\
  !*** ./src/utils/UtilsMath.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "arroundNumber": () => (/* binding */ arroundNumber),
/* harmony export */   "formattedValue": () => (/* binding */ formattedValue),
/* harmony export */   "trunkCurrency": () => (/* binding */ trunkCurrency)
/* harmony export */ });
var arroundNumber = function (value) {
    var roundedNum = Math.ceil(value * 20) / 20;
    return roundedNum;
};
var trunkCurrency = function (value) {
    return parseFloat((value).toFixed(2));
};
// export const formattedValue = (value: number) : string => {  
//   return value.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
// }
var formattedValue = function (value) {
    return value.toString();
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _service_ParseService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service/ParseService */ "./src/service/ParseService.ts");
/* harmony import */ var _service_PurchaseService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./service/PurchaseService */ "./src/service/PurchaseService.ts");
/* harmony import */ var _service_ReceiptService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./service/ReceiptService */ "./src/service/ReceiptService.ts");



var items = document.getElementById("items");
var result = document.getElementById("result");
var addButton = document.getElementById("addButton");
items.value =
    "\n1 imported bottle of perfume at 27.99\n1 bottle of perfume at 18.99\n1 packet of headache pills at 9.75\n3 imported boxes of chocolates at 11.25\n";
addButton.addEventListener("click", function () {
    var listOfItem = _service_ParseService__WEBPACK_IMPORTED_MODULE_0__.ParseService.parseToProduct(items.value);
    var purchaseService = new _service_PurchaseService__WEBPACK_IMPORTED_MODULE_1__.PurchaseService();
    listOfItem.forEach(function (item) { return purchaseService.add(item); });
    var basket = purchaseService.getBasket();
    result.value = _service_ReceiptService__WEBPACK_IMPORTED_MODULE_2__.ReceiptService.getPrint(basket);
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBLGdDQUFnQyxFQUFFO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUM7QUFDdUI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckIwQztBQUN4QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLDJEQUFrQjtBQUNwQztBQUNBLHVCQUF1QiwrREFBYTtBQUNwQyx3QkFBd0IsK0RBQWEsQ0FBQywrREFBYTtBQUNuRCx5QkFBeUIsK0RBQWE7QUFDdEMsb0JBQW9CLCtEQUFhO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGVBQWUsK0RBQWE7QUFDNUI7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDMEI7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3Q3lCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGdFQUFjLDJDQUEyQyxnRUFBYztBQUNyRyxTQUFTO0FBQ1Qsd0NBQXdDLGdFQUFjO0FBQ3RELGtDQUFrQyxnRUFBYztBQUNoRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ3lCOzs7Ozs7Ozs7Ozs7Ozs7QUNoQjFCLGdCQUFnQixTQUFJLElBQUksU0FBSTtBQUM1QjtBQUNBLGlEQUFpRCxPQUFPO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsYUFBYSxhQUFhO0FBQ3ZFO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSw2Q0FBNkMsYUFBYSxjQUFjO0FBQ3hFO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDcUI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkNmO0FBQ1A7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsbURBQW1EO0FBQzlGO0FBQ087QUFDUDtBQUNBOzs7Ozs7O1VDWkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTnNEO0FBQ007QUFDRjtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsOEVBQTJCO0FBQ2hELDhCQUE4QixxRUFBZTtBQUM3Qyx5Q0FBeUMsbUNBQW1DO0FBQzVFO0FBQ0EsbUJBQW1CLDRFQUF1QjtBQUMxQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2UvUGFyc2VTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlL1B1cmNoYXNlU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZS9SZWNlaXB0U2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZS9UYXhTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9VdGlsc01hdGgudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgcmVnZXhRdWFudGl0eSA9IC9eKFxcZCspLztcbnZhciByZWdleE5hbWUgPSAvXFxzKFthLXpcXHNdKylcXHMrYXRcXHMrL2k7XG52YXIgcmVnZXhQcmljZSA9IC9hdFxccysoXFxkK1xcLlxcZHsyfSkkLztcbnZhciBQYXJzZVNlcnZpY2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGFyc2VTZXJ2aWNlKCkge1xuICAgIH1cbiAgICBQYXJzZVNlcnZpY2UucGFyc2VUb1Byb2R1Y3QgPSBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgICB2YXIgbGluZXMgPSB0ZXh0LnRyaW0oKS5zcGxpdChcIlxcblwiKTtcbiAgICAgICAgcmV0dXJuIGxpbmVzLm1hcChmdW5jdGlvbiAobGluZSkge1xuICAgICAgICAgICAgdmFyIHF1YW50aXR5ID0gcGFyc2VJbnQocmVnZXhRdWFudGl0eS5leGVjKGxpbmUpWzFdLCAxMCk7XG4gICAgICAgICAgICB2YXIgbmFtZSA9IHJlZ2V4TmFtZS5leGVjKGxpbmUpWzFdO1xuICAgICAgICAgICAgdmFyIHByaWNlID0gcGFyc2VGbG9hdChyZWdleFByaWNlLmV4ZWMobGluZSlbMV0pO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBxdWFudGl0eTogcXVhbnRpdHksXG4gICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgICBwcmljZTogcHJpY2UsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBQYXJzZVNlcnZpY2U7XG59KCkpO1xuZXhwb3J0IHsgUGFyc2VTZXJ2aWNlIH07XG4iLCJpbXBvcnQgeyBhcnJvdW5kTnVtYmVyLCB0cnVua0N1cnJlbmN5IH0gZnJvbSBcIi4uL3V0aWxzL1V0aWxzTWF0aFwiO1xuaW1wb3J0IHsgVGF4U2VydmljZSB9IGZyb20gXCIuL1RheFNlcnZpY2VcIjtcbnZhciBQdXJjaGFzZVNlcnZpY2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUHVyY2hhc2VTZXJ2aWNlKCkge1xuICAgICAgICB0aGlzLml0ZW1zID0gW107XG4gICAgfVxuICAgIFB1cmNoYXNlU2VydmljZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKHByb2R1Y3QpIHtcbiAgICAgICAgdmFyIHRheCA9IFRheFNlcnZpY2UuZmluZFRheChwcm9kdWN0Lm5hbWUpO1xuICAgICAgICB2YXIgc3ViVG90YWwgPSBwcm9kdWN0LnF1YW50aXR5ICogcHJvZHVjdC5wcmljZTtcbiAgICAgICAgdmFyIGJhc2ljVGF4ID0gYXJyb3VuZE51bWJlcigoc3ViVG90YWwgKiB0YXguYmFzaWNUYXgpIC8gMTAwKTtcbiAgICAgICAgdmFyIGltcG9ydFRheCA9IGFycm91bmROdW1iZXIoYXJyb3VuZE51bWJlcigocHJvZHVjdC5wcmljZSAqIHRheC5pbXBvcnRUYXgpIC8gMTAwKSAqIHByb2R1Y3QucXVhbnRpdHkpO1xuICAgICAgICB2YXIgc2FsZXNUYXhlcyA9IGFycm91bmROdW1iZXIoaW1wb3J0VGF4ICsgYmFzaWNUYXgpO1xuICAgICAgICB2YXIgdG90YWwgPSB0cnVua0N1cnJlbmN5KHN1YlRvdGFsICsgc2FsZXNUYXhlcyk7XG4gICAgICAgIHZhciBpdGVtID0ge1xuICAgICAgICAgICAgaWQ6IFwiXCIsXG4gICAgICAgICAgICBwcm9kdWN0OiBwcm9kdWN0LFxuICAgICAgICAgICAgdG90YWw6IHRvdGFsLFxuICAgICAgICAgICAgc2FsZXNUYXhlczogc2FsZXNUYXhlcyxcbiAgICAgICAgICAgIGltcG9ydFRheDogaW1wb3J0VGF4LFxuICAgICAgICAgICAgYmFzaWNUYXg6IGJhc2ljVGF4XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaXRlbXMucHVzaChpdGVtKTtcbiAgICB9O1xuICAgIFB1cmNoYXNlU2VydmljZS5wcm90b3R5cGUuZ2V0VG90YWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBjKSB7XG4gICAgICAgICAgICBhY2MgKz0gYy50b3RhbDtcbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIDApO1xuICAgIH07XG4gICAgUHVyY2hhc2VTZXJ2aWNlLnByb3RvdHlwZS5nZXRTYWxlc1RheGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJyb3VuZE51bWJlcih0aGlzLml0ZW1zLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBjKSB7XG4gICAgICAgICAgICBhY2MgKz0gYy5zYWxlc1RheGVzO1xuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwgMCkpO1xuICAgIH07XG4gICAgUHVyY2hhc2VTZXJ2aWNlLnByb3RvdHlwZS5nZXRCYXNrZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZDogXCJcIixcbiAgICAgICAgICAgIHByb2R1Y3Q6IHRoaXMuaXRlbXMsXG4gICAgICAgICAgICBzYWxlc1RheGVzOiB0aGlzLmdldFNhbGVzVGF4ZXMoKSxcbiAgICAgICAgICAgIHRvdGFsOiB0aGlzLmdldFRvdGFsKCksXG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gUHVyY2hhc2VTZXJ2aWNlO1xufSgpKTtcbmV4cG9ydCB7IFB1cmNoYXNlU2VydmljZSB9O1xuIiwiaW1wb3J0IHsgZm9ybWF0dGVkVmFsdWUgfSBmcm9tIFwiLi4vdXRpbHMvVXRpbHNNYXRoXCI7XG52YXIgUmVjZWlwdFNlcnZpY2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUmVjZWlwdFNlcnZpY2UoKSB7XG4gICAgfVxuICAgIFJlY2VpcHRTZXJ2aWNlLmdldFByaW50ID0gZnVuY3Rpb24gKGJhc2tldCkge1xuICAgICAgICB2YXIgdGV4dCA9IFwiXCI7XG4gICAgICAgIGJhc2tldC5wcm9kdWN0LmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHZhciBfYSA9IGl0ZW0ucHJvZHVjdCwgcXVhbnRpdHkgPSBfYS5xdWFudGl0eSwgbmFtZSA9IF9hLm5hbWU7XG4gICAgICAgICAgICB0ZXh0ICs9IFwiXCIuY29uY2F0KGZvcm1hdHRlZFZhbHVlKHF1YW50aXR5KSwgXCIgXCIpLmNvbmNhdChuYW1lLCBcIjogXCIpLmNvbmNhdChmb3JtYXR0ZWRWYWx1ZShpdGVtLnRvdGFsKSwgXCIgIHwgIFwiKS5jb25jYXQoaXRlbS5pbXBvcnRUYXgsIFwiIHwgIFwiKS5jb25jYXQoaXRlbS5iYXNpY1RheCwgXCIgICAgICAgIFxcblwiKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRleHQgKz0gXCIgU2FsZXMgVGF4ZXM6IFwiLmNvbmNhdChmb3JtYXR0ZWRWYWx1ZShiYXNrZXQuc2FsZXNUYXhlcyksIFwiIFxcblwiKTtcbiAgICAgICAgdGV4dCArPSBcIiBUb3RhbDogXCIuY29uY2F0KGZvcm1hdHRlZFZhbHVlKGJhc2tldC50b3RhbCksIFwiIFxcblwiKTtcbiAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgfTtcbiAgICByZXR1cm4gUmVjZWlwdFNlcnZpY2U7XG59KCkpO1xuZXhwb3J0IHsgUmVjZWlwdFNlcnZpY2UgfTtcbiIsInZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG52YXIgRVhDRVBUX0JBU0lDX1RBWCA9IFtcImJvb2tcIiwgXCJjaG9jb2xhdGVcIiwgXCJoZWFkYWNoZVwiXTtcbnZhciBJTVBPUlRfRFVUWV9UQVggPSBbXCJpbXBvcnRlZFwiXTtcbnZhciBUYXhTZXJ2aWNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRheFNlcnZpY2UoKSB7XG4gICAgfVxuICAgIFRheFNlcnZpY2UuZmluZFRheCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgICAgICBiYXNpY1RheDogMTAsXG4gICAgICAgICAgICBpbXBvcnRUYXg6IDAsXG4gICAgICAgIH07XG4gICAgICAgIEVYQ0VQVF9CQVNJQ19UQVguZm9yRWFjaChmdW5jdGlvbiAodHlwZU9mUHJvZHVjdCkge1xuICAgICAgICAgICAgaWYgKG5hbWUuaW5jbHVkZXModHlwZU9mUHJvZHVjdCkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcmVzdWx0KSwgeyBiYXNpY1RheDogMCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIElNUE9SVF9EVVRZX1RBWC5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlT2ZQcm9kdWN0KSB7XG4gICAgICAgICAgICBpZiAobmFtZS5pbmNsdWRlcyh0eXBlT2ZQcm9kdWN0KSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCByZXN1bHQpLCB7IGltcG9ydFRheDogNSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICByZXR1cm4gVGF4U2VydmljZTtcbn0oKSk7XG5leHBvcnQgeyBUYXhTZXJ2aWNlIH07XG4iLCJleHBvcnQgdmFyIGFycm91bmROdW1iZXIgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICB2YXIgcm91bmRlZE51bSA9IE1hdGguY2VpbCh2YWx1ZSAqIDIwKSAvIDIwO1xuICAgIHJldHVybiByb3VuZGVkTnVtO1xufTtcbmV4cG9ydCB2YXIgdHJ1bmtDdXJyZW5jeSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHJldHVybiBwYXJzZUZsb2F0KCh2YWx1ZSkudG9GaXhlZCgyKSk7XG59O1xuLy8gZXhwb3J0IGNvbnN0IGZvcm1hdHRlZFZhbHVlID0gKHZhbHVlOiBudW1iZXIpIDogc3RyaW5nID0+IHsgIFxuLy8gICByZXR1cm4gdmFsdWUudG9Mb2NhbGVTdHJpbmcoJ2VuLVVTJywge21pbmltdW1GcmFjdGlvbkRpZ2l0czogMiwgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyfSk7XG4vLyB9XG5leHBvcnQgdmFyIGZvcm1hdHRlZFZhbHVlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBQYXJzZVNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlL1BhcnNlU2VydmljZVwiO1xuaW1wb3J0IHsgUHVyY2hhc2VTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZS9QdXJjaGFzZVNlcnZpY2VcIjtcbmltcG9ydCB7IFJlY2VpcHRTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZS9SZWNlaXB0U2VydmljZVwiO1xudmFyIGl0ZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpdGVtc1wiKTtcbnZhciByZXN1bHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlc3VsdFwiKTtcbnZhciBhZGRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZEJ1dHRvblwiKTtcbml0ZW1zLnZhbHVlID1cbiAgICBcIlxcbjEgaW1wb3J0ZWQgYm90dGxlIG9mIHBlcmZ1bWUgYXQgMjcuOTlcXG4xIGJvdHRsZSBvZiBwZXJmdW1lIGF0IDE4Ljk5XFxuMSBwYWNrZXQgb2YgaGVhZGFjaGUgcGlsbHMgYXQgOS43NVxcbjMgaW1wb3J0ZWQgYm94ZXMgb2YgY2hvY29sYXRlcyBhdCAxMS4yNVxcblwiO1xuYWRkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGxpc3RPZkl0ZW0gPSBQYXJzZVNlcnZpY2UucGFyc2VUb1Byb2R1Y3QoaXRlbXMudmFsdWUpO1xuICAgIHZhciBwdXJjaGFzZVNlcnZpY2UgPSBuZXcgUHVyY2hhc2VTZXJ2aWNlKCk7XG4gICAgbGlzdE9mSXRlbS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiBwdXJjaGFzZVNlcnZpY2UuYWRkKGl0ZW0pOyB9KTtcbiAgICB2YXIgYmFza2V0ID0gcHVyY2hhc2VTZXJ2aWNlLmdldEJhc2tldCgpO1xuICAgIHJlc3VsdC52YWx1ZSA9IFJlY2VpcHRTZXJ2aWNlLmdldFByaW50KGJhc2tldCk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==