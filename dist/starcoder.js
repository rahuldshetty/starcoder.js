/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ var __webpack_modules__ = ({

/***/ "./src/actions.js":
/*!************************!*\
  !*** ./src/actions.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   action: () => (/* binding */ action)\n/* harmony export */ });\nvar action = {\n  LOAD: 0,\n  INITIALIZED: 1,\n  RUN_MAIN: 2,\n  WRITE_RESULT: 3,\n  RUN_COMPLETED: 4,\n  ERROR: 5\n};\n\n//# sourceURL=webpack://starcoder.js/./src/actions.js?");

/***/ }),

/***/ "./src/starcoder.js":
/*!**************************!*\
  !*** ./src/starcoder.js ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   StarCoder: () => (/* binding */ StarCoder)\n/* harmony export */ });\n/* harmony import */ var _actions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions.js */ \"./src/actions.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return _typeof(key) === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (_typeof(input) !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (_typeof(res) !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\n\nvar StarCoder = /*#__PURE__*/function () {\n  // callback have to be defined before load_worker\n  function StarCoder(url, init_callback, write_result_callback, on_complete_callback) {\n    _classCallCheck(this, StarCoder);\n    this.url = url;\n    this.init_callback = init_callback; // called back when model is loaded\n    this.write_result_callback = write_result_callback; // Expectes text parameter and will be called when model generates result.\n    this.on_complete_callback = on_complete_callback;\n  }\n  _createClass(StarCoder, [{\n    key: \"load_worker\",\n    value: function load_worker() {\n      var _this = this;\n      this.worker = new Worker(new URL(/* worker import */ __webpack_require__.p + __webpack_require__.u(\"src_worker_js\"), __webpack_require__.b), {\n        type: \"module\"\n      });\n      this.worker.onmessage = function (event) {\n        switch (event.data.event) {\n          // Load Model\n          case _actions_js__WEBPACK_IMPORTED_MODULE_0__.action.INITIALIZED:\n            {\n              if (_this.init_callback) _this.init_callback();\n              break;\n            }\n\n          // Capture result\n          case _actions_js__WEBPACK_IMPORTED_MODULE_0__.action.WRITE_RESULT:\n            {\n              if (_this.write_result_callback) _this.write_result_callback(event.data.line);\n              break;\n            }\n\n          // Execution Completed\n          case _actions_js__WEBPACK_IMPORTED_MODULE_0__.action.RUN_COMPLETED:\n            {\n              if (_this.on_complete_callback) _this.on_complete_callback();\n              break;\n            }\n        }\n      };\n      this.worker.postMessage({\n        event: _actions_js__WEBPACK_IMPORTED_MODULE_0__.action.LOAD,\n        url: this.url\n      });\n    }\n  }, {\n    key: \"run\",\n    value: function run() {\n      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},\n        prompt = _ref.prompt,\n        _ref$seed = _ref.seed,\n        seed = _ref$seed === void 0 ? -1 : _ref$seed,\n        _ref$max_token_len = _ref.max_token_len,\n        max_token_len = _ref$max_token_len === void 0 ? 50 : _ref$max_token_len,\n        _ref$top_k = _ref.top_k,\n        top_k = _ref$top_k === void 0 ? 40 : _ref$top_k,\n        _ref$top_p = _ref.top_p,\n        top_p = _ref$top_p === void 0 ? 0.9 : _ref$top_p,\n        _ref$temp = _ref.temp,\n        temp = _ref$temp === void 0 ? 1.0 : _ref$temp,\n        _ref$repeat_last_n = _ref.repeat_last_n,\n        repeat_last_n = _ref$repeat_last_n === void 0 ? 64 : _ref$repeat_last_n,\n        _ref$repeat_penalty = _ref.repeat_penalty,\n        repeat_penalty = _ref$repeat_penalty === void 0 ? 1.176 : _ref$repeat_penalty;\n      this.worker.postMessage({\n        event: _actions_js__WEBPACK_IMPORTED_MODULE_0__.action.RUN_MAIN,\n        prompt: prompt,\n        seed: seed,\n        max_token_len: max_token_len,\n        top_k: top_k,\n        top_p: top_p,\n        temp: temp,\n        repeat_last_n: repeat_last_n,\n        repeat_penalty: repeat_penalty\n      });\n    }\n  }]);\n  return StarCoder;\n}();\n\n\n//# sourceURL=webpack://starcoder.js/./src/starcoder.js?");

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/******/ // expose the modules object (__webpack_modules__)
/******/ __webpack_require__.m = __webpack_modules__;
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/get javascript chunk filename */
/******/ (() => {
/******/ 	// This function allow to reference async chunks
/******/ 	__webpack_require__.u = (chunkId) => {
/******/ 		// return url for filenames based on template
/******/ 		return "" + chunkId + ".starcoder.js";
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/publicPath */
/******/ (() => {
/******/ 	var scriptUrl;
/******/ 	if (typeof import.meta.url === "string") scriptUrl = import.meta.url
/******/ 	// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 	// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 	if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 	scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 	__webpack_require__.p = scriptUrl;
/******/ })();
/******/ 
/******/ /* webpack/runtime/jsonp chunk loading */
/******/ (() => {
/******/ 	__webpack_require__.b = document.baseURI || self.location.href;
/******/ 	
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/ 	
/******/ 	// no chunk on demand loading
/******/ 	
/******/ 	// no prefetching
/******/ 	
/******/ 	// no preloaded
/******/ 	
/******/ 	// no HMR
/******/ 	
/******/ 	// no HMR manifest
/******/ 	
/******/ 	// no on chunks loaded
/******/ 	
/******/ 	// no jsonp function
/******/ })();
/******/ 
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module can't be inlined because the eval devtool is used.
/******/ var __webpack_exports__ = __webpack_require__("./src/starcoder.js");
/******/ var __webpack_exports__StarCoder = __webpack_exports__.StarCoder;
/******/ export { __webpack_exports__StarCoder as StarCoder };
/******/ 
