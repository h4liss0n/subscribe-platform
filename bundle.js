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
            basicTax = (0,_utils_UtilsMath__WEBPACK_IMPORTED_MODULE_1__.roundUp)((subTotal * _model_TaxModel__WEBPACK_IMPORTED_MODULE_0__.RATE_BASIC) / 100);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRHFEO0FBQ0E7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHlEQUFPLGFBQWEsdURBQVU7QUFDckQ7QUFDQTtBQUNBLHdCQUF3Qix5REFBTyxDQUFDLHlEQUFPLGtCQUFrQix3REFBVztBQUNwRTtBQUNBLHlCQUF5Qix5REFBTztBQUNoQyxvQkFBb0IsK0RBQWE7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsZUFBZSx5REFBTztBQUN0QjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDMEI7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5Q3lCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGdFQUFjLDJDQUEyQyxnRUFBYztBQUNyRyxTQUFTO0FBQ1QsdUNBQXVDLGdFQUFjO0FBQ3JELGlDQUFpQyxnRUFBYztBQUMvQztBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ3lCOzs7Ozs7Ozs7Ozs7Ozs7O0FDaEJnQjtBQUMxQztBQUNBO0FBQ0EsaUNBQWlDLEVBQUU7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDJEQUFrQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUM7QUFDdUI7Ozs7Ozs7Ozs7Ozs7OztBQ3hCeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELHlCQUF5QjtBQUNqRjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ3FCOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3JCZjtBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7O1VDWkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTjREO0FBQ0Y7QUFDRTtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLG9GQUEyQjtBQUNoRCw4QkFBOEIscUVBQWU7QUFDN0MseUNBQXlDLG1DQUFtQztBQUM1RTtBQUNBLG1CQUFtQiw0RUFBdUI7QUFDMUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9tb2RlbC9UYXhNb2RlbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZS9QdXJjaGFzZVNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2UvUmVjZWlwdFNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2UvcGFyc2UvUGFyc2VTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlL3BhcnNlL1RheFNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL1V0aWxzTWF0aC50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB2YXIgUkFURV9JTVBPUlQgPSA1O1xuZXhwb3J0IHZhciBSQVRFX0JBU0lDID0gMTA7XG4iLCJpbXBvcnQgeyBSQVRFX0JBU0lDLCBSQVRFX0lNUE9SVCB9IGZyb20gXCIuLi9tb2RlbC9UYXhNb2RlbFwiO1xuaW1wb3J0IHsgcm91bmRVcCwgdHJ1bmtDdXJyZW5jeSB9IGZyb20gXCIuLi91dGlscy9VdGlsc01hdGhcIjtcbnZhciBQdXJjaGFzZVNlcnZpY2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUHVyY2hhc2VTZXJ2aWNlKCkge1xuICAgICAgICB0aGlzLml0ZW1zID0gW107XG4gICAgfVxuICAgIFB1cmNoYXNlU2VydmljZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKHByb2R1Y3QpIHtcbiAgICAgICAgdmFyIGJhc2ljVGF4ID0gMDtcbiAgICAgICAgdmFyIGltcG9ydFRheCA9IDA7XG4gICAgICAgIHZhciBzdWJUb3RhbCA9IHByb2R1Y3QucXVhbnRpdHkgKiBwcm9kdWN0LnByaWNlO1xuICAgICAgICBpZiAocHJvZHVjdC50YXhUeXBlcy5pbmNsdWRlcyhcIkJBU0lDXCIpKSB7XG4gICAgICAgICAgICBiYXNpY1RheCA9IHJvdW5kVXAoKHN1YlRvdGFsICogUkFURV9CQVNJQykgLyAxMDApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9kdWN0LnRheFR5cGVzLmluY2x1ZGVzKFwiSU1QT1JUXCIpKSB7XG4gICAgICAgICAgICBpbXBvcnRUYXggPSByb3VuZFVwKHJvdW5kVXAoKHByb2R1Y3QucHJpY2UgKiBSQVRFX0lNUE9SVCkgLyAxMDApICogcHJvZHVjdC5xdWFudGl0eSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNhbGVzVGF4ZXMgPSByb3VuZFVwKGltcG9ydFRheCArIGJhc2ljVGF4KTtcbiAgICAgICAgdmFyIHRvdGFsID0gdHJ1bmtDdXJyZW5jeShzdWJUb3RhbCArIHNhbGVzVGF4ZXMpO1xuICAgICAgICB2YXIgaXRlbSA9IHtcbiAgICAgICAgICAgIHByb2R1Y3Q6IHByb2R1Y3QsXG4gICAgICAgICAgICB0b3RhbDogdG90YWwsXG4gICAgICAgICAgICBzYWxlc1RheGVzOiBzYWxlc1RheGVzLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLml0ZW1zLnB1c2goaXRlbSk7XG4gICAgfTtcbiAgICBQdXJjaGFzZVNlcnZpY2UucHJvdG90eXBlLmdldFRvdGFsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgYykge1xuICAgICAgICAgICAgYWNjICs9IGMudG90YWw7XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCAwKTtcbiAgICB9O1xuICAgIFB1cmNoYXNlU2VydmljZS5wcm90b3R5cGUuZ2V0U2FsZXNUYXhlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHJvdW5kVXAodGhpcy5pdGVtcy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgYykge1xuICAgICAgICAgICAgYWNjICs9IGMuc2FsZXNUYXhlcztcbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIDApKTtcbiAgICB9O1xuICAgIFB1cmNoYXNlU2VydmljZS5wcm90b3R5cGUuZ2V0QmFza2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcHJvZHVjdDogdGhpcy5pdGVtcyxcbiAgICAgICAgICAgIHNhbGVzVGF4ZXM6IHRoaXMuZ2V0U2FsZXNUYXhlcygpLFxuICAgICAgICAgICAgdG90YWw6IHRoaXMuZ2V0VG90YWwoKSxcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBQdXJjaGFzZVNlcnZpY2U7XG59KCkpO1xuZXhwb3J0IHsgUHVyY2hhc2VTZXJ2aWNlIH07XG4iLCJpbXBvcnQgeyBmb3JtYXR0ZWRWYWx1ZSB9IGZyb20gXCIuLi91dGlscy9VdGlsc01hdGhcIjtcbnZhciBSZWNlaXB0U2VydmljZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBSZWNlaXB0U2VydmljZSgpIHtcbiAgICB9XG4gICAgUmVjZWlwdFNlcnZpY2UuZ2V0UHJpbnQgPSBmdW5jdGlvbiAoYmFza2V0KSB7XG4gICAgICAgIHZhciB0ZXh0ID0gXCJcIjtcbiAgICAgICAgYmFza2V0LnByb2R1Y3QuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgdmFyIF9hID0gaXRlbS5wcm9kdWN0LCBxdWFudGl0eSA9IF9hLnF1YW50aXR5LCBuYW1lID0gX2EubmFtZTtcbiAgICAgICAgICAgIHRleHQgKz0gXCJcIi5jb25jYXQoZm9ybWF0dGVkVmFsdWUocXVhbnRpdHkpLCBcIiBcIikuY29uY2F0KG5hbWUsIFwiOiBcIikuY29uY2F0KGZvcm1hdHRlZFZhbHVlKGl0ZW0udG90YWwpLCBcIlxcblwiKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRleHQgKz0gXCJTYWxlcyBUYXhlczogXCIuY29uY2F0KGZvcm1hdHRlZFZhbHVlKGJhc2tldC5zYWxlc1RheGVzKSwgXCIgXFxuXCIpO1xuICAgICAgICB0ZXh0ICs9IFwiVG90YWw6IFwiLmNvbmNhdChmb3JtYXR0ZWRWYWx1ZShiYXNrZXQudG90YWwpLCBcIiBcXG5cIik7XG4gICAgICAgIHJldHVybiB0ZXh0O1xuICAgIH07XG4gICAgcmV0dXJuIFJlY2VpcHRTZXJ2aWNlO1xufSgpKTtcbmV4cG9ydCB7IFJlY2VpcHRTZXJ2aWNlIH07XG4iLCJpbXBvcnQgeyBUYXhTZXJ2aWNlIH0gZnJvbSBcIi4vVGF4U2VydmljZVwiO1xudmFyIFJFR0VYX1FVQU5USVRZID0gL14oXFxkKykvO1xudmFyIFJFR0VYX05BTUUgPSAvXFxzKFthLXpcXHNdKylcXHMrYXRcXHMrL2k7XG52YXIgUkVHRVhfUFJJQ0UgPSAvYXRcXHMrKFxcZCtcXC5cXGR7Mn0pJC87XG52YXIgUGFyc2VTZXJ2aWNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBhcnNlU2VydmljZSgpIHtcbiAgICB9XG4gICAgUGFyc2VTZXJ2aWNlLnBhcnNlVG9Qcm9kdWN0ID0gZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgICAgdmFyIGxpbmVzID0gdGV4dC50cmltKCkuc3BsaXQoXCJcXG5cIik7XG4gICAgICAgIHJldHVybiBsaW5lcy5tYXAoZnVuY3Rpb24gKGxpbmUpIHtcbiAgICAgICAgICAgIHZhciBxdWFudGl0eSA9IHBhcnNlSW50KFJFR0VYX1FVQU5USVRZLmV4ZWMobGluZSlbMV0sIDEwKTtcbiAgICAgICAgICAgIHZhciBuYW1lID0gUkVHRVhfTkFNRS5leGVjKGxpbmUpWzFdO1xuICAgICAgICAgICAgdmFyIHByaWNlID0gcGFyc2VGbG9hdChSRUdFWF9QUklDRS5leGVjKGxpbmUpWzFdKTtcbiAgICAgICAgICAgIHZhciB0YXhUeXBlcyA9IFRheFNlcnZpY2UuZmluZFRheChuYW1lKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcXVhbnRpdHk6IHF1YW50aXR5LFxuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgcHJpY2U6IHByaWNlLFxuICAgICAgICAgICAgICAgIHRheFR5cGVzOiB0YXhUeXBlcyxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIFBhcnNlU2VydmljZTtcbn0oKSk7XG5leHBvcnQgeyBQYXJzZVNlcnZpY2UgfTtcbiIsInZhciBFWENFUFRfQkFTSUNfVEFYID0gW1wiYm9va1wiLCBcImNob2NvbGF0ZVwiLCBcImhlYWRhY2hlXCJdO1xudmFyIElNUE9SVF9EVVRZX1RBWCA9IFtcImltcG9ydGVkXCJdO1xudmFyIFRheFNlcnZpY2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGF4U2VydmljZSgpIHtcbiAgICB9XG4gICAgVGF4U2VydmljZS5maW5kVGF4ID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtcIkJBU0lDXCJdO1xuICAgICAgICBFWENFUFRfQkFTSUNfVEFYLmZvckVhY2goZnVuY3Rpb24gKHR5cGVPZlByb2R1Y3QpIHtcbiAgICAgICAgICAgIGlmIChuYW1lLmluY2x1ZGVzKHR5cGVPZlByb2R1Y3QpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmZpbHRlcihmdW5jdGlvbiAodGF4KSB7IHJldHVybiB0YXggIT09IFwiQkFTSUNcIjsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBJTVBPUlRfRFVUWV9UQVguZm9yRWFjaChmdW5jdGlvbiAodHlwZU9mUHJvZHVjdCkge1xuICAgICAgICAgICAgaWYgKG5hbWUuaW5jbHVkZXModHlwZU9mUHJvZHVjdCkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChcIklNUE9SVFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICByZXR1cm4gVGF4U2VydmljZTtcbn0oKSk7XG5leHBvcnQgeyBUYXhTZXJ2aWNlIH07XG4iLCJleHBvcnQgdmFyIHJvdW5kVXAgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICB2YXIgcm91bmRlZE51bSA9IE1hdGguY2VpbCh2YWx1ZSAqIDIwKSAvIDIwO1xuICAgIHJldHVybiByb3VuZGVkTnVtO1xufTtcbmV4cG9ydCB2YXIgdHJ1bmtDdXJyZW5jeSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlLnRvRml4ZWQoMikpO1xufTtcbmV4cG9ydCB2YXIgZm9ybWF0dGVkVmFsdWUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUudG9Mb2NhbGVTdHJpbmcoXCJlbi1VU1wiLCB7XG4gICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgIH0pO1xufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgUHVyY2hhc2VTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZS9QdXJjaGFzZVNlcnZpY2VcIjtcbmltcG9ydCB7IFJlY2VpcHRTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZS9SZWNlaXB0U2VydmljZVwiO1xuaW1wb3J0IHsgUGFyc2VTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZS9wYXJzZS9QYXJzZVNlcnZpY2VcIjtcbnZhciBpdGVtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaXRlbXNcIik7XG52YXIgcmVzdWx0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXN1bHRcIik7XG52YXIgYWRkQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRCdXR0b25cIik7XG5pdGVtcy52YWx1ZSA9IFwiMSBpbXBvcnRlZCBib3R0bGUgb2YgcGVyZnVtZSBhdCAyNy45OVxcbjEgYm90dGxlIG9mIHBlcmZ1bWUgYXQgMTguOTlcXG4xIHBhY2tldCBvZiBoZWFkYWNoZSBwaWxscyBhdCA5Ljc1XFxuMyBpbXBvcnRlZCBib3hlcyBvZiBjaG9jb2xhdGVzIGF0IDExLjI1XCI7XG5hZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbGlzdE9mSXRlbSA9IFBhcnNlU2VydmljZS5wYXJzZVRvUHJvZHVjdChpdGVtcy52YWx1ZSk7XG4gICAgdmFyIHB1cmNoYXNlU2VydmljZSA9IG5ldyBQdXJjaGFzZVNlcnZpY2UoKTtcbiAgICBsaXN0T2ZJdGVtLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIHB1cmNoYXNlU2VydmljZS5hZGQoaXRlbSk7IH0pO1xuICAgIHZhciBiYXNrZXQgPSBwdXJjaGFzZVNlcnZpY2UuZ2V0QmFza2V0KCk7XG4gICAgcmVzdWx0LnZhbHVlID0gUmVjZWlwdFNlcnZpY2UuZ2V0UHJpbnQoYmFza2V0KTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9