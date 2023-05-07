/******/ (() => {
  // webpackBootstrap
  /******/ "use strict";
  /******/ var __webpack_modules__ = {
    /***/ "./src/service/ParseService.ts":
      /*!*************************************!*\
  !*** ./src/service/ParseService.ts ***!
  \*************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ ParseService: () => /* binding */ ParseService,
          /* harmony export */
        });
        var REGEX_QUANTITY = /^(\d+)/;
        var REGEX_NAME = /\s([a-z\s]+)\s+at\s+/i;
        var REGEX_PRICE = /at\s+(\d+\.\d{2})$/;
        var ParseService = /** @class */ (function () {
          function ParseService() {}
          ParseService.parseToProduct = function (text) {
            var lines = text.trim().split("\n");
            return lines.map(function (line) {
              var quantity = parseInt(REGEX_QUANTITY.exec(line)[1], 10);
              var name = REGEX_NAME.exec(line)[1];
              var price = parseFloat(REGEX_PRICE.exec(line)[1]);
              return {
                quantity: quantity,
                name: name,
                price: price,
              };
            });
          };
          return ParseService;
        })();

        /***/
      },

    /***/ "./src/service/PurchaseService.ts":
      /*!****************************************!*\
  !*** ./src/service/PurchaseService.ts ***!
  \****************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ PurchaseService: () =>
            /* binding */ PurchaseService,
          /* harmony export */
        });
        /* harmony import */ var _utils_UtilsMath__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../utils/UtilsMath */ "./src/utils/UtilsMath.ts"
          );
        /* harmony import */ var _TaxService__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./TaxService */ "./src/service/TaxService.ts"
          );

        var PurchaseService = /** @class */ (function () {
          function PurchaseService() {
            this.items = [];
          }
          PurchaseService.prototype.add = function (product) {
            var tax =
              _TaxService__WEBPACK_IMPORTED_MODULE_1__.TaxService.findTax(
                product.name
              );
            var subTotal = product.quantity * product.price;
            var basicTax = (0,
            _utils_UtilsMath__WEBPACK_IMPORTED_MODULE_0__.roundUp)(
              (subTotal * tax.basic) / 100
            );
            var importTax = (0,
            _utils_UtilsMath__WEBPACK_IMPORTED_MODULE_0__.roundUp)(
              (0, _utils_UtilsMath__WEBPACK_IMPORTED_MODULE_0__.roundUp)(
                (product.price * tax.import) / 100
              ) * product.quantity
            );
            var salesTaxes = (0,
            _utils_UtilsMath__WEBPACK_IMPORTED_MODULE_0__.roundUp)(
              importTax + basicTax
            );
            var total = (0,
            _utils_UtilsMath__WEBPACK_IMPORTED_MODULE_0__.trunkCurrency)(
              subTotal + salesTaxes
            );
            var item = {
              id: "",
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
            return (0, _utils_UtilsMath__WEBPACK_IMPORTED_MODULE_0__.roundUp)(
              this.items.reduce(function (acc, c) {
                acc += c.salesTaxes;
                return acc;
              }, 0)
            );
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
        })();

        /***/
      },

    /***/ "./src/service/ReceiptService.ts":
      /*!***************************************!*\
  !*** ./src/service/ReceiptService.ts ***!
  \***************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ ReceiptService: () =>
            /* binding */ ReceiptService,
          /* harmony export */
        });
        /* harmony import */ var _utils_UtilsMath__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../utils/UtilsMath */ "./src/utils/UtilsMath.ts"
          );

        var ReceiptService = /** @class */ (function () {
          function ReceiptService() {}
          ReceiptService.getPrint = function (basket) {
            var text = "";
            basket.product.forEach(function (item) {
              var _a = item.product,
                quantity = _a.quantity,
                name = _a.name;
              text += ""
                .concat(
                  (0,
                  _utils_UtilsMath__WEBPACK_IMPORTED_MODULE_0__.formattedValue)(
                    quantity
                  ),
                  " "
                )
                .concat(name, ": ")
                .concat(
                  (0,
                  _utils_UtilsMath__WEBPACK_IMPORTED_MODULE_0__.formattedValue)(
                    item.total
                  ),
                  "\n"
                );
            });
            text += "Sales Taxes: ".concat(
              (0, _utils_UtilsMath__WEBPACK_IMPORTED_MODULE_0__.formattedValue)(
                basket.salesTaxes
              ),
              " \n"
            );
            text += "Total: ".concat(
              (0, _utils_UtilsMath__WEBPACK_IMPORTED_MODULE_0__.formattedValue)(
                basket.total
              ),
              " \n"
            );
            return text;
          };
          return ReceiptService;
        })();

        /***/
      },

    /***/ "./src/service/TaxService.ts":
      /*!***********************************!*\
  !*** ./src/service/TaxService.ts ***!
  \***********************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ TaxService: () => /* binding */ TaxService,
          /* harmony export */
        });
        var __assign =
          (undefined && undefined.__assign) ||
          function () {
            __assign =
              Object.assign ||
              function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                  s = arguments[i];
                  for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
              };
            return __assign.apply(this, arguments);
          };
        var EXCEPT_BASIC_TAX = ["book", "chocolate", "headache"];
        var IMPORT_DUTY_TAX = ["imported"];
        var TaxService = /** @class */ (function () {
          function TaxService() {}
          TaxService.findTax = function (name) {
            var result = {
              basic: 10,
              import: 0,
            };
            EXCEPT_BASIC_TAX.forEach(function (typeOfProduct) {
              if (name.includes(typeOfProduct)) {
                result = __assign(__assign({}, result), { basic: 0 });
              }
            });
            IMPORT_DUTY_TAX.forEach(function (typeOfProduct) {
              if (name.includes(typeOfProduct)) {
                result = __assign(__assign({}, result), { import: 5 });
              }
            });
            return result;
          };
          return TaxService;
        })();

        /***/
      },

    /***/ "./src/utils/UtilsMath.ts":
      /*!********************************!*\
  !*** ./src/utils/UtilsMath.ts ***!
  \********************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ formattedValue: () =>
            /* binding */ formattedValue,
          /* harmony export */ roundUp: () => /* binding */ roundUp,
          /* harmony export */ trunkCurrency: () => /* binding */ trunkCurrency,
          /* harmony export */
        });
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

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
        /******/
      }
      /******/ Object.defineProperty(exports, "__esModule", { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
  (() => {
    /*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ var _service_ParseService__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(
        /*! ./service/ParseService */ "./src/service/ParseService.ts"
      );
    /* harmony import */ var _service_PurchaseService__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(
        /*! ./service/PurchaseService */ "./src/service/PurchaseService.ts"
      );
    /* harmony import */ var _service_ReceiptService__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(
        /*! ./service/ReceiptService */ "./src/service/ReceiptService.ts"
      );

    var items = document.getElementById("items");
    var result = document.getElementById("result");
    var addButton = document.getElementById("addButton");
    items.value =
      "1 imported bottle of perfume at 27.99\n1 bottle of perfume at 18.99\n1 packet of headache pills at 9.75\n3 imported boxes of chocolates at 11.25";
    addButton.addEventListener("click", function () {
      var listOfItem =
        _service_ParseService__WEBPACK_IMPORTED_MODULE_0__.ParseService.parseToProduct(
          items.value
        );
      var purchaseService =
        new _service_PurchaseService__WEBPACK_IMPORTED_MODULE_1__.PurchaseService();
      listOfItem.forEach(function (item) {
        return purchaseService.add(item);
      });
      var basket = purchaseService.getBasket();
      result.value =
        _service_ReceiptService__WEBPACK_IMPORTED_MODULE_2__.ReceiptService.getPrint(
          basket
        );
    });
  })();

  /******/
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBLGlDQUFpQyxFQUFFO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUM7QUFDdUI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckJvQztBQUNsQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLDJEQUFrQjtBQUNwQztBQUNBLHVCQUF1Qix5REFBTztBQUM5Qix3QkFBd0IseURBQU8sQ0FBQyx5REFBTztBQUN2Qyx5QkFBeUIseURBQU87QUFDaEMsb0JBQW9CLCtEQUFhO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsZUFBZSx5REFBTztBQUN0QjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUMwQjs7Ozs7Ozs7Ozs7Ozs7OztBQzNDeUI7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsZ0VBQWMsMkNBQTJDLGdFQUFjO0FBQ3JHLFNBQVM7QUFDVCx1Q0FBdUMsZ0VBQWM7QUFDckQsaUNBQWlDLGdFQUFjO0FBQy9DO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDeUI7Ozs7Ozs7Ozs7Ozs7OztBQ2hCMUIsZ0JBQWdCLFNBQUksSUFBSSxTQUFJO0FBQzVCO0FBQ0EsaURBQWlELE9BQU87QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxhQUFhLFVBQVU7QUFDcEU7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLDZDQUE2QyxhQUFhLFdBQVc7QUFDckU7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQ2Y7QUFDUDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7OztVQ1pBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05zRDtBQUNNO0FBQ0Y7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiw4RUFBMkI7QUFDaEQsOEJBQThCLHFFQUFlO0FBQzdDLHlDQUF5QyxtQ0FBbUM7QUFDNUU7QUFDQSxtQkFBbUIsNEVBQXVCO0FBQzFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZS9QYXJzZVNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2UvUHVyY2hhc2VTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlL1JlY2VpcHRTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlL1RheFNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL1V0aWxzTWF0aC50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBSRUdFWF9RVUFOVElUWSA9IC9eKFxcZCspLztcbnZhciBSRUdFWF9OQU1FID0gL1xccyhbYS16XFxzXSspXFxzK2F0XFxzKy9pO1xudmFyIFJFR0VYX1BSSUNFID0gL2F0XFxzKyhcXGQrXFwuXFxkezJ9KSQvO1xudmFyIFBhcnNlU2VydmljZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQYXJzZVNlcnZpY2UoKSB7XG4gICAgfVxuICAgIFBhcnNlU2VydmljZS5wYXJzZVRvUHJvZHVjdCA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHRleHQudHJpbSgpLnNwbGl0KFwiXFxuXCIpO1xuICAgICAgICByZXR1cm4gbGluZXMubWFwKGZ1bmN0aW9uIChsaW5lKSB7XG4gICAgICAgICAgICB2YXIgcXVhbnRpdHkgPSBwYXJzZUludChSRUdFWF9RVUFOVElUWS5leGVjKGxpbmUpWzFdLCAxMCk7XG4gICAgICAgICAgICB2YXIgbmFtZSA9IFJFR0VYX05BTUUuZXhlYyhsaW5lKVsxXTtcbiAgICAgICAgICAgIHZhciBwcmljZSA9IHBhcnNlRmxvYXQoUkVHRVhfUFJJQ0UuZXhlYyhsaW5lKVsxXSk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHF1YW50aXR5OiBxdWFudGl0eSxcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgICAgIHByaWNlOiBwcmljZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIFBhcnNlU2VydmljZTtcbn0oKSk7XG5leHBvcnQgeyBQYXJzZVNlcnZpY2UgfTtcbiIsImltcG9ydCB7IHJvdW5kVXAsIHRydW5rQ3VycmVuY3kgfSBmcm9tIFwiLi4vdXRpbHMvVXRpbHNNYXRoXCI7XG5pbXBvcnQgeyBUYXhTZXJ2aWNlIH0gZnJvbSBcIi4vVGF4U2VydmljZVwiO1xudmFyIFB1cmNoYXNlU2VydmljZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQdXJjaGFzZVNlcnZpY2UoKSB7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICB9XG4gICAgUHVyY2hhc2VTZXJ2aWNlLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAocHJvZHVjdCkge1xuICAgICAgICB2YXIgdGF4ID0gVGF4U2VydmljZS5maW5kVGF4KHByb2R1Y3QubmFtZSk7XG4gICAgICAgIHZhciBzdWJUb3RhbCA9IHByb2R1Y3QucXVhbnRpdHkgKiBwcm9kdWN0LnByaWNlO1xuICAgICAgICB2YXIgYmFzaWNUYXggPSByb3VuZFVwKChzdWJUb3RhbCAqIHRheC5iYXNpYykgLyAxMDApO1xuICAgICAgICB2YXIgaW1wb3J0VGF4ID0gcm91bmRVcChyb3VuZFVwKChwcm9kdWN0LnByaWNlICogdGF4LmltcG9ydCkgLyAxMDApICogcHJvZHVjdC5xdWFudGl0eSk7XG4gICAgICAgIHZhciBzYWxlc1RheGVzID0gcm91bmRVcChpbXBvcnRUYXggKyBiYXNpY1RheCk7XG4gICAgICAgIHZhciB0b3RhbCA9IHRydW5rQ3VycmVuY3koc3ViVG90YWwgKyBzYWxlc1RheGVzKTtcbiAgICAgICAgdmFyIGl0ZW0gPSB7XG4gICAgICAgICAgICBpZDogXCJcIixcbiAgICAgICAgICAgIHByb2R1Y3Q6IHByb2R1Y3QsXG4gICAgICAgICAgICB0b3RhbDogdG90YWwsXG4gICAgICAgICAgICBzYWxlc1RheGVzOiBzYWxlc1RheGVzLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLml0ZW1zLnB1c2goaXRlbSk7XG4gICAgfTtcbiAgICBQdXJjaGFzZVNlcnZpY2UucHJvdG90eXBlLmdldFRvdGFsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgYykge1xuICAgICAgICAgICAgYWNjICs9IGMudG90YWw7XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCAwKTtcbiAgICB9O1xuICAgIFB1cmNoYXNlU2VydmljZS5wcm90b3R5cGUuZ2V0U2FsZXNUYXhlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHJvdW5kVXAodGhpcy5pdGVtcy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgYykge1xuICAgICAgICAgICAgYWNjICs9IGMuc2FsZXNUYXhlcztcbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIDApKTtcbiAgICB9O1xuICAgIFB1cmNoYXNlU2VydmljZS5wcm90b3R5cGUuZ2V0QmFza2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IFwiXCIsXG4gICAgICAgICAgICBwcm9kdWN0OiB0aGlzLml0ZW1zLFxuICAgICAgICAgICAgc2FsZXNUYXhlczogdGhpcy5nZXRTYWxlc1RheGVzKCksXG4gICAgICAgICAgICB0b3RhbDogdGhpcy5nZXRUb3RhbCgpLFxuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIFB1cmNoYXNlU2VydmljZTtcbn0oKSk7XG5leHBvcnQgeyBQdXJjaGFzZVNlcnZpY2UgfTtcbiIsImltcG9ydCB7IGZvcm1hdHRlZFZhbHVlIH0gZnJvbSBcIi4uL3V0aWxzL1V0aWxzTWF0aFwiO1xudmFyIFJlY2VpcHRTZXJ2aWNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFJlY2VpcHRTZXJ2aWNlKCkge1xuICAgIH1cbiAgICBSZWNlaXB0U2VydmljZS5nZXRQcmludCA9IGZ1bmN0aW9uIChiYXNrZXQpIHtcbiAgICAgICAgdmFyIHRleHQgPSBcIlwiO1xuICAgICAgICBiYXNrZXQucHJvZHVjdC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICB2YXIgX2EgPSBpdGVtLnByb2R1Y3QsIHF1YW50aXR5ID0gX2EucXVhbnRpdHksIG5hbWUgPSBfYS5uYW1lO1xuICAgICAgICAgICAgdGV4dCArPSBcIlwiLmNvbmNhdChmb3JtYXR0ZWRWYWx1ZShxdWFudGl0eSksIFwiIFwiKS5jb25jYXQobmFtZSwgXCI6IFwiKS5jb25jYXQoZm9ybWF0dGVkVmFsdWUoaXRlbS50b3RhbCksIFwiXFxuXCIpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGV4dCArPSBcIlNhbGVzIFRheGVzOiBcIi5jb25jYXQoZm9ybWF0dGVkVmFsdWUoYmFza2V0LnNhbGVzVGF4ZXMpLCBcIiBcXG5cIik7XG4gICAgICAgIHRleHQgKz0gXCJUb3RhbDogXCIuY29uY2F0KGZvcm1hdHRlZFZhbHVlKGJhc2tldC50b3RhbCksIFwiIFxcblwiKTtcbiAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgfTtcbiAgICByZXR1cm4gUmVjZWlwdFNlcnZpY2U7XG59KCkpO1xuZXhwb3J0IHsgUmVjZWlwdFNlcnZpY2UgfTtcbiIsInZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG52YXIgRVhDRVBUX0JBU0lDX1RBWCA9IFtcImJvb2tcIiwgXCJjaG9jb2xhdGVcIiwgXCJoZWFkYWNoZVwiXTtcbnZhciBJTVBPUlRfRFVUWV9UQVggPSBbXCJpbXBvcnRlZFwiXTtcbnZhciBUYXhTZXJ2aWNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRheFNlcnZpY2UoKSB7XG4gICAgfVxuICAgIFRheFNlcnZpY2UuZmluZFRheCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgICAgICBiYXNpYzogMTAsXG4gICAgICAgICAgICBpbXBvcnQ6IDAsXG4gICAgICAgIH07XG4gICAgICAgIEVYQ0VQVF9CQVNJQ19UQVguZm9yRWFjaChmdW5jdGlvbiAodHlwZU9mUHJvZHVjdCkge1xuICAgICAgICAgICAgaWYgKG5hbWUuaW5jbHVkZXModHlwZU9mUHJvZHVjdCkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcmVzdWx0KSwgeyBiYXNpYzogMCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIElNUE9SVF9EVVRZX1RBWC5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlT2ZQcm9kdWN0KSB7XG4gICAgICAgICAgICBpZiAobmFtZS5pbmNsdWRlcyh0eXBlT2ZQcm9kdWN0KSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCByZXN1bHQpLCB7IGltcG9ydDogNSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICByZXR1cm4gVGF4U2VydmljZTtcbn0oKSk7XG5leHBvcnQgeyBUYXhTZXJ2aWNlIH07XG4iLCJleHBvcnQgdmFyIHJvdW5kVXAgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICB2YXIgcm91bmRlZE51bSA9IE1hdGguY2VpbCh2YWx1ZSAqIDIwKSAvIDIwO1xuICAgIHJldHVybiByb3VuZGVkTnVtO1xufTtcbmV4cG9ydCB2YXIgdHJ1bmtDdXJyZW5jeSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlLnRvRml4ZWQoMikpO1xufTtcbmV4cG9ydCB2YXIgZm9ybWF0dGVkVmFsdWUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUudG9Mb2NhbGVTdHJpbmcoXCJlbi1VU1wiLCB7XG4gICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgIH0pO1xufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgUGFyc2VTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZS9QYXJzZVNlcnZpY2VcIjtcbmltcG9ydCB7IFB1cmNoYXNlU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2UvUHVyY2hhc2VTZXJ2aWNlXCI7XG5pbXBvcnQgeyBSZWNlaXB0U2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2UvUmVjZWlwdFNlcnZpY2VcIjtcbnZhciBpdGVtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaXRlbXNcIik7XG52YXIgcmVzdWx0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXN1bHRcIik7XG52YXIgYWRkQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRCdXR0b25cIik7XG5pdGVtcy52YWx1ZSA9IFwiMSBpbXBvcnRlZCBib3R0bGUgb2YgcGVyZnVtZSBhdCAyNy45OVxcbjEgYm90dGxlIG9mIHBlcmZ1bWUgYXQgMTguOTlcXG4xIHBhY2tldCBvZiBoZWFkYWNoZSBwaWxscyBhdCA5Ljc1XFxuMyBpbXBvcnRlZCBib3hlcyBvZiBjaG9jb2xhdGVzIGF0IDExLjI1XCI7XG5hZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbGlzdE9mSXRlbSA9IFBhcnNlU2VydmljZS5wYXJzZVRvUHJvZHVjdChpdGVtcy52YWx1ZSk7XG4gICAgdmFyIHB1cmNoYXNlU2VydmljZSA9IG5ldyBQdXJjaGFzZVNlcnZpY2UoKTtcbiAgICBsaXN0T2ZJdGVtLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIHB1cmNoYXNlU2VydmljZS5hZGQoaXRlbSk7IH0pO1xuICAgIHZhciBiYXNrZXQgPSBwdXJjaGFzZVNlcnZpY2UuZ2V0QmFza2V0KCk7XG4gICAgcmVzdWx0LnZhbHVlID0gUmVjZWlwdFNlcnZpY2UuZ2V0UHJpbnQoYmFza2V0KTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
