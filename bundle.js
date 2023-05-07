/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/model/TaxModel.ts":
/*!*******************************!*\
  !*** ./src/model/TaxModel.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RATE_BASIC": () => (/* binding */ RATE_BASIC),
/* harmony export */   "RATE_IMPORT": () => (/* binding */ RATE_IMPORT)
/* harmony export */ });
var RATE_IMPORT = 5;
var RATE_BASIC = 10;


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
/* harmony import */ var _model_TaxModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model/TaxModel */ "./src/model/TaxModel.ts");
/* harmony import */ var _utils_UtilsMath__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/UtilsMath */ "./src/utils/UtilsMath.ts");


var PurchaseService = /** @class */ (function () {
    function PurchaseService() {
        this.items = [];
    }
    PurchaseService.prototype.add = function (product) {
        var basicTax = 0;
        var importTax = 0;
        var subTotal = product.quantity * product.price;
        if (product.taxTypes.includes("BASIC")) {
            basicTax = (0,_utils_UtilsMath__WEBPACK_IMPORTED_MODULE_1__.roundUp)((0,_utils_UtilsMath__WEBPACK_IMPORTED_MODULE_1__.roundUp)((product.price * _model_TaxModel__WEBPACK_IMPORTED_MODULE_0__.RATE_BASIC) / 100) * product.quantity);
        }
        if (product.taxTypes.includes("IMPORT")) {
            importTax = (0,_utils_UtilsMath__WEBPACK_IMPORTED_MODULE_1__.roundUp)((0,_utils_UtilsMath__WEBPACK_IMPORTED_MODULE_1__.roundUp)((product.price * _model_TaxModel__WEBPACK_IMPORTED_MODULE_0__.RATE_IMPORT) / 100) * product.quantity);
        }
        var salesTaxes = (0,_utils_UtilsMath__WEBPACK_IMPORTED_MODULE_1__.roundUp)(importTax + basicTax);
        var total = (0,_utils_UtilsMath__WEBPACK_IMPORTED_MODULE_1__.trunkCurrency)(subTotal + salesTaxes);
        var item = {
            product: product,
            total: total,
            salesTaxes: salesTaxes,
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
        return (0,_utils_UtilsMath__WEBPACK_IMPORTED_MODULE_1__.roundUp)(this.items.reduce(function (acc, c) {
            acc += c.salesTaxes;
            return acc;
        }, 0));
    };
    PurchaseService.prototype.getBasket = function () {
        return {
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
            text += "".concat((0,_utils_UtilsMath__WEBPACK_IMPORTED_MODULE_0__.formattedValue)(quantity), " ").concat(name, ": ").concat((0,_utils_UtilsMath__WEBPACK_IMPORTED_MODULE_0__.formattedValue)(item.total), "\n");
        });
        text += "Sales Taxes: ".concat((0,_utils_UtilsMath__WEBPACK_IMPORTED_MODULE_0__.formattedValue)(basket.salesTaxes), " \n");
        text += "Total: ".concat((0,_utils_UtilsMath__WEBPACK_IMPORTED_MODULE_0__.formattedValue)(basket.total), " \n");
        return text;
    };
    return ReceiptService;
}());



/***/ }),

/***/ "./src/service/parse/ParseService.ts":
/*!*******************************************!*\
  !*** ./src/service/parse/ParseService.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParseService": () => (/* binding */ ParseService)
/* harmony export */ });
/* harmony import */ var _TaxService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TaxService */ "./src/service/parse/TaxService.ts");

var REGEX_QUANTITY = /^(\d+)/;
var REGEX_NAME = /\s([a-z\s]+)\s+at\s+/i;
var REGEX_PRICE = /at\s+(\d+\.\d{2})$/;
var ParseService = /** @class */ (function () {
    function ParseService() {
    }
    ParseService.parseToProduct = function (text) {
        var lines = text.trim().split("\n");
        return lines.map(function (line) {
            var quantity = parseInt(REGEX_QUANTITY.exec(line)[1], 10);
            var name = REGEX_NAME.exec(line)[1];
            var price = parseFloat(REGEX_PRICE.exec(line)[1]);
            var taxTypes = _TaxService__WEBPACK_IMPORTED_MODULE_0__.TaxService.findTax(name);
            return {
                quantity: quantity,
                name: name,
                price: price,
                taxTypes: taxTypes,
            };
        });
    };
    return ParseService;
}());



/***/ }),

/***/ "./src/service/parse/TaxService.ts":
/*!*****************************************!*\
  !*** ./src/service/parse/TaxService.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TaxService": () => (/* binding */ TaxService)
/* harmony export */ });
var EXCEPT_BASIC_TAX = ["book", "chocolate", "headache"];
var IMPORT_DUTY_TAX = ["imported"];
var TaxService = /** @class */ (function () {
    function TaxService() {
    }
    TaxService.findTax = function (name) {
        var result = ["BASIC"];
        EXCEPT_BASIC_TAX.forEach(function (typeOfProduct) {
            if (name.includes(typeOfProduct)) {
                result = result.filter(function (tax) { return tax !== "BASIC"; });
            }
        });
        IMPORT_DUTY_TAX.forEach(function (typeOfProduct) {
            if (name.includes(typeOfProduct)) {
                result.push("IMPORT");
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
/* harmony export */   "formattedValue": () => (/* binding */ formattedValue),
/* harmony export */   "roundUp": () => (/* binding */ roundUp),
/* harmony export */   "trunkCurrency": () => (/* binding */ trunkCurrency)
/* harmony export */ });
var roundUp = function (value) {
    var roundedNum = Math.ceil(value * 20) / 20;
    return roundedNum;
};
var trunkCurrency = function (value) {
    return parseFloat(value.toFixed(2));
};
var formattedValue = function (value) {
    return value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
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
/* harmony import */ var _service_PurchaseService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service/PurchaseService */ "./src/service/PurchaseService.ts");
/* harmony import */ var _service_ReceiptService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./service/ReceiptService */ "./src/service/ReceiptService.ts");
/* harmony import */ var _service_parse_ParseService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./service/parse/ParseService */ "./src/service/parse/ParseService.ts");



var items = document.getElementById("items");
var result = document.getElementById("result");
var addButton = document.getElementById("addButton");
items.value = "1 imported bottle of perfume at 27.99\n1 bottle of perfume at 18.99\n1 packet of headache pills at 9.75\n3 imported boxes of chocolates at 11.25";
addButton.addEventListener("click", function () {
    var listOfItem = _service_parse_ParseService__WEBPACK_IMPORTED_MODULE_2__.ParseService.parseToProduct(items.value);
    var purchaseService = new _service_PurchaseService__WEBPACK_IMPORTED_MODULE_0__.PurchaseService();
    listOfItem.forEach(function (item) { return purchaseService.add(item); });
    var basket = purchaseService.getBasket();
    result.value = _service_ReceiptService__WEBPACK_IMPORTED_MODULE_1__.ReceiptService.getPrint(basket);
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRHFEO0FBQ0E7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHlEQUFPLENBQUMseURBQU8sa0JBQWtCLHVEQUFVO0FBQ2xFO0FBQ0E7QUFDQSx3QkFBd0IseURBQU8sQ0FBQyx5REFBTyxrQkFBa0Isd0RBQVc7QUFDcEU7QUFDQSx5QkFBeUIseURBQU87QUFDaEMsb0JBQW9CLCtEQUFhO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGVBQWUseURBQU87QUFDdEI7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQzBCOzs7Ozs7Ozs7Ozs7Ozs7O0FDOUN5QjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixnRUFBYywyQ0FBMkMsZ0VBQWM7QUFDckcsU0FBUztBQUNULHVDQUF1QyxnRUFBYztBQUNyRCxpQ0FBaUMsZ0VBQWM7QUFDL0M7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUN5Qjs7Ozs7Ozs7Ozs7Ozs7OztBQ2hCZ0I7QUFDMUM7QUFDQTtBQUNBLGlDQUFpQyxFQUFFO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQiwyREFBa0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxDQUFDO0FBQ3VCOzs7Ozs7Ozs7Ozs7Ozs7QUN4QnhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCx5QkFBeUI7QUFDakY7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQmY7QUFDUDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7OztVQ1pBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ040RDtBQUNGO0FBQ0U7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixvRkFBMkI7QUFDaEQsOEJBQThCLHFFQUFlO0FBQzdDLHlDQUF5QyxtQ0FBbUM7QUFDNUU7QUFDQSxtQkFBbUIsNEVBQXVCO0FBQzFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWwvVGF4TW9kZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2UvUHVyY2hhc2VTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlL1JlY2VpcHRTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlL3BhcnNlL1BhcnNlU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZS9wYXJzZS9UYXhTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9VdGlsc01hdGgudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgdmFyIFJBVEVfSU1QT1JUID0gNTtcbmV4cG9ydCB2YXIgUkFURV9CQVNJQyA9IDEwO1xuIiwiaW1wb3J0IHsgUkFURV9CQVNJQywgUkFURV9JTVBPUlQgfSBmcm9tIFwiLi4vbW9kZWwvVGF4TW9kZWxcIjtcbmltcG9ydCB7IHJvdW5kVXAsIHRydW5rQ3VycmVuY3kgfSBmcm9tIFwiLi4vdXRpbHMvVXRpbHNNYXRoXCI7XG52YXIgUHVyY2hhc2VTZXJ2aWNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFB1cmNoYXNlU2VydmljZSgpIHtcbiAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgIH1cbiAgICBQdXJjaGFzZVNlcnZpY2UucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChwcm9kdWN0KSB7XG4gICAgICAgIHZhciBiYXNpY1RheCA9IDA7XG4gICAgICAgIHZhciBpbXBvcnRUYXggPSAwO1xuICAgICAgICB2YXIgc3ViVG90YWwgPSBwcm9kdWN0LnF1YW50aXR5ICogcHJvZHVjdC5wcmljZTtcbiAgICAgICAgaWYgKHByb2R1Y3QudGF4VHlwZXMuaW5jbHVkZXMoXCJCQVNJQ1wiKSkge1xuICAgICAgICAgICAgYmFzaWNUYXggPSByb3VuZFVwKHJvdW5kVXAoKHByb2R1Y3QucHJpY2UgKiBSQVRFX0JBU0lDKSAvIDEwMCkgKiBwcm9kdWN0LnF1YW50aXR5KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvZHVjdC50YXhUeXBlcy5pbmNsdWRlcyhcIklNUE9SVFwiKSkge1xuICAgICAgICAgICAgaW1wb3J0VGF4ID0gcm91bmRVcChyb3VuZFVwKChwcm9kdWN0LnByaWNlICogUkFURV9JTVBPUlQpIC8gMTAwKSAqIHByb2R1Y3QucXVhbnRpdHkpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzYWxlc1RheGVzID0gcm91bmRVcChpbXBvcnRUYXggKyBiYXNpY1RheCk7XG4gICAgICAgIHZhciB0b3RhbCA9IHRydW5rQ3VycmVuY3koc3ViVG90YWwgKyBzYWxlc1RheGVzKTtcbiAgICAgICAgdmFyIGl0ZW0gPSB7XG4gICAgICAgICAgICBwcm9kdWN0OiBwcm9kdWN0LFxuICAgICAgICAgICAgdG90YWw6IHRvdGFsLFxuICAgICAgICAgICAgc2FsZXNUYXhlczogc2FsZXNUYXhlcyxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5pdGVtcy5wdXNoKGl0ZW0pO1xuICAgIH07XG4gICAgUHVyY2hhc2VTZXJ2aWNlLnByb3RvdHlwZS5nZXRUb3RhbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGMpIHtcbiAgICAgICAgICAgIGFjYyArPSBjLnRvdGFsO1xuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwgMCk7XG4gICAgfTtcbiAgICBQdXJjaGFzZVNlcnZpY2UucHJvdG90eXBlLmdldFNhbGVzVGF4ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiByb3VuZFVwKHRoaXMuaXRlbXMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGMpIHtcbiAgICAgICAgICAgIGFjYyArPSBjLnNhbGVzVGF4ZXM7XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCAwKSk7XG4gICAgfTtcbiAgICBQdXJjaGFzZVNlcnZpY2UucHJvdG90eXBlLmdldEJhc2tldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHByb2R1Y3Q6IHRoaXMuaXRlbXMsXG4gICAgICAgICAgICBzYWxlc1RheGVzOiB0aGlzLmdldFNhbGVzVGF4ZXMoKSxcbiAgICAgICAgICAgIHRvdGFsOiB0aGlzLmdldFRvdGFsKCksXG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gUHVyY2hhc2VTZXJ2aWNlO1xufSgpKTtcbmV4cG9ydCB7IFB1cmNoYXNlU2VydmljZSB9O1xuIiwiaW1wb3J0IHsgZm9ybWF0dGVkVmFsdWUgfSBmcm9tIFwiLi4vdXRpbHMvVXRpbHNNYXRoXCI7XG52YXIgUmVjZWlwdFNlcnZpY2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUmVjZWlwdFNlcnZpY2UoKSB7XG4gICAgfVxuICAgIFJlY2VpcHRTZXJ2aWNlLmdldFByaW50ID0gZnVuY3Rpb24gKGJhc2tldCkge1xuICAgICAgICB2YXIgdGV4dCA9IFwiXCI7XG4gICAgICAgIGJhc2tldC5wcm9kdWN0LmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHZhciBfYSA9IGl0ZW0ucHJvZHVjdCwgcXVhbnRpdHkgPSBfYS5xdWFudGl0eSwgbmFtZSA9IF9hLm5hbWU7XG4gICAgICAgICAgICB0ZXh0ICs9IFwiXCIuY29uY2F0KGZvcm1hdHRlZFZhbHVlKHF1YW50aXR5KSwgXCIgXCIpLmNvbmNhdChuYW1lLCBcIjogXCIpLmNvbmNhdChmb3JtYXR0ZWRWYWx1ZShpdGVtLnRvdGFsKSwgXCJcXG5cIik7XG4gICAgICAgIH0pO1xuICAgICAgICB0ZXh0ICs9IFwiU2FsZXMgVGF4ZXM6IFwiLmNvbmNhdChmb3JtYXR0ZWRWYWx1ZShiYXNrZXQuc2FsZXNUYXhlcyksIFwiIFxcblwiKTtcbiAgICAgICAgdGV4dCArPSBcIlRvdGFsOiBcIi5jb25jYXQoZm9ybWF0dGVkVmFsdWUoYmFza2V0LnRvdGFsKSwgXCIgXFxuXCIpO1xuICAgICAgICByZXR1cm4gdGV4dDtcbiAgICB9O1xuICAgIHJldHVybiBSZWNlaXB0U2VydmljZTtcbn0oKSk7XG5leHBvcnQgeyBSZWNlaXB0U2VydmljZSB9O1xuIiwiaW1wb3J0IHsgVGF4U2VydmljZSB9IGZyb20gXCIuL1RheFNlcnZpY2VcIjtcbnZhciBSRUdFWF9RVUFOVElUWSA9IC9eKFxcZCspLztcbnZhciBSRUdFWF9OQU1FID0gL1xccyhbYS16XFxzXSspXFxzK2F0XFxzKy9pO1xudmFyIFJFR0VYX1BSSUNFID0gL2F0XFxzKyhcXGQrXFwuXFxkezJ9KSQvO1xudmFyIFBhcnNlU2VydmljZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQYXJzZVNlcnZpY2UoKSB7XG4gICAgfVxuICAgIFBhcnNlU2VydmljZS5wYXJzZVRvUHJvZHVjdCA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHRleHQudHJpbSgpLnNwbGl0KFwiXFxuXCIpO1xuICAgICAgICByZXR1cm4gbGluZXMubWFwKGZ1bmN0aW9uIChsaW5lKSB7XG4gICAgICAgICAgICB2YXIgcXVhbnRpdHkgPSBwYXJzZUludChSRUdFWF9RVUFOVElUWS5leGVjKGxpbmUpWzFdLCAxMCk7XG4gICAgICAgICAgICB2YXIgbmFtZSA9IFJFR0VYX05BTUUuZXhlYyhsaW5lKVsxXTtcbiAgICAgICAgICAgIHZhciBwcmljZSA9IHBhcnNlRmxvYXQoUkVHRVhfUFJJQ0UuZXhlYyhsaW5lKVsxXSk7XG4gICAgICAgICAgICB2YXIgdGF4VHlwZXMgPSBUYXhTZXJ2aWNlLmZpbmRUYXgobmFtZSk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHF1YW50aXR5OiBxdWFudGl0eSxcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgICAgIHByaWNlOiBwcmljZSxcbiAgICAgICAgICAgICAgICB0YXhUeXBlczogdGF4VHlwZXMsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBQYXJzZVNlcnZpY2U7XG59KCkpO1xuZXhwb3J0IHsgUGFyc2VTZXJ2aWNlIH07XG4iLCJ2YXIgRVhDRVBUX0JBU0lDX1RBWCA9IFtcImJvb2tcIiwgXCJjaG9jb2xhdGVcIiwgXCJoZWFkYWNoZVwiXTtcbnZhciBJTVBPUlRfRFVUWV9UQVggPSBbXCJpbXBvcnRlZFwiXTtcbnZhciBUYXhTZXJ2aWNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRheFNlcnZpY2UoKSB7XG4gICAgfVxuICAgIFRheFNlcnZpY2UuZmluZFRheCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXCJCQVNJQ1wiXTtcbiAgICAgICAgRVhDRVBUX0JBU0lDX1RBWC5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlT2ZQcm9kdWN0KSB7XG4gICAgICAgICAgICBpZiAobmFtZS5pbmNsdWRlcyh0eXBlT2ZQcm9kdWN0KSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5maWx0ZXIoZnVuY3Rpb24gKHRheCkgeyByZXR1cm4gdGF4ICE9PSBcIkJBU0lDXCI7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgSU1QT1JUX0RVVFlfVEFYLmZvckVhY2goZnVuY3Rpb24gKHR5cGVPZlByb2R1Y3QpIHtcbiAgICAgICAgICAgIGlmIChuYW1lLmluY2x1ZGVzKHR5cGVPZlByb2R1Y3QpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goXCJJTVBPUlRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgcmV0dXJuIFRheFNlcnZpY2U7XG59KCkpO1xuZXhwb3J0IHsgVGF4U2VydmljZSB9O1xuIiwiZXhwb3J0IHZhciByb3VuZFVwID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgdmFyIHJvdW5kZWROdW0gPSBNYXRoLmNlaWwodmFsdWUgKiAyMCkgLyAyMDtcbiAgICByZXR1cm4gcm91bmRlZE51bTtcbn07XG5leHBvcnQgdmFyIHRydW5rQ3VycmVuY3kgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZS50b0ZpeGVkKDIpKTtcbn07XG5leHBvcnQgdmFyIGZvcm1hdHRlZFZhbHVlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnRvTG9jYWxlU3RyaW5nKFwiZW4tVVNcIiwge1xuICAgICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICB9KTtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFB1cmNoYXNlU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2UvUHVyY2hhc2VTZXJ2aWNlXCI7XG5pbXBvcnQgeyBSZWNlaXB0U2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2UvUmVjZWlwdFNlcnZpY2VcIjtcbmltcG9ydCB7IFBhcnNlU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2UvcGFyc2UvUGFyc2VTZXJ2aWNlXCI7XG52YXIgaXRlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIml0ZW1zXCIpO1xudmFyIHJlc3VsdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzdWx0XCIpO1xudmFyIGFkZEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkQnV0dG9uXCIpO1xuaXRlbXMudmFsdWUgPSBcIjEgaW1wb3J0ZWQgYm90dGxlIG9mIHBlcmZ1bWUgYXQgMjcuOTlcXG4xIGJvdHRsZSBvZiBwZXJmdW1lIGF0IDE4Ljk5XFxuMSBwYWNrZXQgb2YgaGVhZGFjaGUgcGlsbHMgYXQgOS43NVxcbjMgaW1wb3J0ZWQgYm94ZXMgb2YgY2hvY29sYXRlcyBhdCAxMS4yNVwiO1xuYWRkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGxpc3RPZkl0ZW0gPSBQYXJzZVNlcnZpY2UucGFyc2VUb1Byb2R1Y3QoaXRlbXMudmFsdWUpO1xuICAgIHZhciBwdXJjaGFzZVNlcnZpY2UgPSBuZXcgUHVyY2hhc2VTZXJ2aWNlKCk7XG4gICAgbGlzdE9mSXRlbS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiBwdXJjaGFzZVNlcnZpY2UuYWRkKGl0ZW0pOyB9KTtcbiAgICB2YXIgYmFza2V0ID0gcHVyY2hhc2VTZXJ2aWNlLmdldEJhc2tldCgpO1xuICAgIHJlc3VsdC52YWx1ZSA9IFJlY2VpcHRTZXJ2aWNlLmdldFByaW50KGJhc2tldCk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==