"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatefamily_vine"]("main_window",{

/***/ "./src/app.jsx":
/*!*********************!*\
  !*** ./src/app.jsx ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ \"./node_modules/react-dom/client.js\");\n/* harmony import */ var _components_example_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/example.jsx */ \"./src/components/example.jsx\");\n\n\n\nconst root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(document.getElementById(\"root\"));\nroot.render(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_example_jsx__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBwLmpzeCIsIm1hcHBpbmdzIjoiOzs7OztBQUErQjtBQUNjO0FBQ0M7QUFHOUMsTUFBTUcsSUFBSSxHQUFHRiw0REFBVSxDQUFDRyxRQUFRLENBQUNDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN4REYsSUFBSSxDQUFDRyxNQUFNLGNBQ1BOLGdEQUFBLENBQUNFLCtEQUFPLE1BQUUsQ0FDZCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmFtaWx5LXZpbmUvLi9zcmMvYXBwLmpzeD85M2JjIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNyZWF0ZVJvb3QgfSBmcm9tICdyZWFjdC1kb20vY2xpZW50J1xuaW1wb3J0IEV4YW1wbGUgZnJvbSAnLi9jb21wb25lbnRzL2V4YW1wbGUuanN4J1xuXG5cbmNvbnN0IHJvb3QgPSBjcmVhdGVSb290KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKSlcbnJvb3QucmVuZGVyKFxuICAgIDxFeGFtcGxlIC8+XG4pXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJjcmVhdGVSb290IiwiRXhhbXBsZSIsInJvb3QiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicmVuZGVyIiwiY3JlYXRlRWxlbWVudCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/app.jsx\n");

/***/ }),

/***/ "./src/components/example.jsx":
/*!************************************!*\
  !*** ./src/components/example.jsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Example)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\nfunction Example() {\n  // Create state for filepath\n  const [filepath, setFilePath] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(\"\");\n  const [mediaCreationStatus, setMediaCreationStatus] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(\"Try to add Media!\");\n  const [medias, setMedias] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n\n  // Open a file dialog and update the filepath\n  async function addMedia() {\n    let failed = await window.electronAPI.createMedia();\n    if (!failed) {\n      setMediaCreationStatus(\"Sucessfully added media to DB!\");\n    } else {\n      setMediaCreationStatus(\"Failed to add media to DB :(\");\n    }\n  }\n  async function getMedia() {\n    setMedias([await window.electronAPI.getMedia()]);\n    console.log(medias);\n  }\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"h2\", null, \"Try to Add Media to DB: \"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"button\", {\n    onClick: addMedia\n  }, \"Add Media\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"br\", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"h2\", null, \"Try to Read Media from DB: \"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"button\", {\n    onClick: getMedia\n  }, \"Get Media\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"ol\", null, medias.map(media => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"li\", null, media))));\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9leGFtcGxlLmpzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBOEI7QUFDRTtBQUVqQixTQUFTRSxPQUFPQSxDQUFBLEVBQUc7RUFDOUI7RUFDQSxNQUFNLENBQUNDLFFBQVEsRUFBRUMsV0FBVyxDQUFDLEdBQUdILCtDQUFRLENBQUMsRUFBRSxDQUFDO0VBQzVDLE1BQU0sQ0FBQ0ksbUJBQW1CLEVBQUVDLHNCQUFzQixDQUFDLEdBQUdMLCtDQUFRLENBQUMsbUJBQW1CLENBQUM7RUFDbkYsTUFBTSxDQUFDTSxNQUFNLEVBQUVDLFNBQVMsQ0FBQyxHQUFHUCwrQ0FBUSxDQUFDLEVBQUUsQ0FBQzs7RUFFeEM7RUFDQSxlQUFlUSxRQUFRQSxDQUFBLEVBQUc7SUFDdEIsSUFBSUMsTUFBTSxHQUFHLE1BQU1DLE1BQU0sQ0FBQ0MsV0FBVyxDQUFDQyxXQUFXLENBQUMsQ0FBQztJQUNuRCxJQUFJLENBQUNILE1BQU0sRUFBRTtNQUNUSixzQkFBc0IsQ0FBQyxnQ0FBZ0MsQ0FBQztJQUM1RCxDQUFDLE1BQU07TUFDSEEsc0JBQXNCLENBQUMsOEJBQThCLENBQUM7SUFDMUQ7RUFDSjtFQUVBLGVBQWVRLFFBQVFBLENBQUEsRUFBRztJQUN0Qk4sU0FBUyxDQUNMLENBQUMsTUFBTUcsTUFBTSxDQUFDQyxXQUFXLENBQUNFLFFBQVEsQ0FBQyxDQUFDLENBQ3hDLENBQUM7SUFDREMsT0FBTyxDQUFDQyxHQUFHLENBQUNULE1BQU0sQ0FBQztFQUN2QjtFQUVBLG9CQUNJUCxnREFBQSxDQUFBQSwyQ0FBQSxxQkFDSUEsZ0RBQUEsYUFBSSwwQkFBNEIsQ0FBQyxlQUNqQ0EsZ0RBQUE7SUFBUW1CLE9BQU8sRUFBRVY7RUFBUyxHQUFDLFdBQWlCLENBQUMsZUFDN0NULGdEQUFBLFdBQUksQ0FBQyxlQUNMQSxnREFBQSxhQUFJLDZCQUErQixDQUFDLGVBQ3BDQSxnREFBQTtJQUFRbUIsT0FBTyxFQUFFTDtFQUFTLEdBQUMsV0FBaUIsQ0FBQyxlQUM3Q2QsZ0RBQUEsYUFFUU8sTUFBTSxDQUFDYSxHQUFHLENBQUVDLEtBQUssaUJBQ2JyQixnREFBQSxhQUFLcUIsS0FBVSxDQUNsQixDQUVMLENBQ04sQ0FBQztBQUVYIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmFtaWx5LXZpbmUvLi9zcmMvY29tcG9uZW50cy9leGFtcGxlLmpzeD83OWI0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRXhhbXBsZSgpIHtcbiAgICAvLyBDcmVhdGUgc3RhdGUgZm9yIGZpbGVwYXRoXG4gICAgY29uc3QgW2ZpbGVwYXRoLCBzZXRGaWxlUGF0aF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgICBjb25zdCBbbWVkaWFDcmVhdGlvblN0YXR1cywgc2V0TWVkaWFDcmVhdGlvblN0YXR1c10gPSB1c2VTdGF0ZShcIlRyeSB0byBhZGQgTWVkaWEhXCIpO1xuICAgIGNvbnN0IFttZWRpYXMsIHNldE1lZGlhc10gPSB1c2VTdGF0ZShbXSlcblxuICAgIC8vIE9wZW4gYSBmaWxlIGRpYWxvZyBhbmQgdXBkYXRlIHRoZSBmaWxlcGF0aFxuICAgIGFzeW5jIGZ1bmN0aW9uIGFkZE1lZGlhKCkge1xuICAgICAgICBsZXQgZmFpbGVkID0gYXdhaXQgd2luZG93LmVsZWN0cm9uQVBJLmNyZWF0ZU1lZGlhKCk7XG4gICAgICAgIGlmICghZmFpbGVkKSB7XG4gICAgICAgICAgICBzZXRNZWRpYUNyZWF0aW9uU3RhdHVzKFwiU3VjZXNzZnVsbHkgYWRkZWQgbWVkaWEgdG8gREIhXCIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXRNZWRpYUNyZWF0aW9uU3RhdHVzKFwiRmFpbGVkIHRvIGFkZCBtZWRpYSB0byBEQiA6KFwiKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0TWVkaWEoKSB7XG4gICAgICAgIHNldE1lZGlhcyhcbiAgICAgICAgICAgIFthd2FpdCB3aW5kb3cuZWxlY3Ryb25BUEkuZ2V0TWVkaWEoKV1cbiAgICAgICAgKVxuICAgICAgICBjb25zb2xlLmxvZyhtZWRpYXMpXG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPD5cbiAgICAgICAgICAgIDxoMj5UcnkgdG8gQWRkIE1lZGlhIHRvIERCOiA8L2gyPlxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXthZGRNZWRpYX0+QWRkIE1lZGlhPC9idXR0b24+XG4gICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgPGgyPlRyeSB0byBSZWFkIE1lZGlhIGZyb20gREI6IDwvaDI+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2dldE1lZGlhfT5HZXQgTWVkaWE8L2J1dHRvbj5cbiAgICAgICAgICAgIDxvbD5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG1lZGlhcy5tYXAoKG1lZGlhKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+e21lZGlhfTwvbGk+XG4gICAgICAgICAgICAgICAgICAgICkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9vbD5cbiAgICAgICAgPC8+XG4gICAgKVxufVxuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJFeGFtcGxlIiwiZmlsZXBhdGgiLCJzZXRGaWxlUGF0aCIsIm1lZGlhQ3JlYXRpb25TdGF0dXMiLCJzZXRNZWRpYUNyZWF0aW9uU3RhdHVzIiwibWVkaWFzIiwic2V0TWVkaWFzIiwiYWRkTWVkaWEiLCJmYWlsZWQiLCJ3aW5kb3ciLCJlbGVjdHJvbkFQSSIsImNyZWF0ZU1lZGlhIiwiZ2V0TWVkaWEiLCJjb25zb2xlIiwibG9nIiwiY3JlYXRlRWxlbWVudCIsIkZyYWdtZW50Iiwib25DbGljayIsIm1hcCIsIm1lZGlhIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/example.jsx\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("f18387158da206eab161")
/******/ })();
/******/ 
/******/ }
);