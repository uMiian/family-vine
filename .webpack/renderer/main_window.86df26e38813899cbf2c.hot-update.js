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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Example)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\nfunction Example() {\n  // Create state for filepath\n  const [filepath, setFilePath] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(\"\");\n  const [mediaCreationStatus, setMediaCreationStatus] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(\"\");\n\n  // Open a file dialog and update the filepath\n  async function addMedia() {\n    let failed = await window.electronAPI.createMedia();\n    if (!failed) {\n      setMediaCreationStatus(\"Sucessfully added media to DB!\");\n    }\n  }\n  async function getMedia() {\n    let medias = await window.electronAPI.getMedia();\n  }\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"h2\", null, \"Try to Add Media to DB: \"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"btn\", {\n    onClick: addMedia\n  }, \"Add Media\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"br\", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"h2\", null, \"Try to Read Media from DB: \"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"btn\", {\n    onClick: getMedia\n  }, \"Get Media\"));\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9leGFtcGxlLmpzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBOEI7QUFDRTtBQUVqQixTQUFTRSxPQUFPQSxDQUFBLEVBQUc7RUFDOUI7RUFDQSxNQUFNLENBQUNDLFFBQVEsRUFBRUMsV0FBVyxDQUFDLEdBQUdILCtDQUFRLENBQUMsRUFBRSxDQUFDO0VBQzVDLE1BQU0sQ0FBQ0ksbUJBQW1CLEVBQUVDLHNCQUFzQixDQUFDLEdBQUdMLCtDQUFRLENBQUMsRUFBRSxDQUFDOztFQUVsRTtFQUNBLGVBQWVNLFFBQVFBLENBQUEsRUFBRztJQUN0QixJQUFJQyxNQUFNLEdBQUcsTUFBTUMsTUFBTSxDQUFDQyxXQUFXLENBQUNDLFdBQVcsQ0FBQyxDQUFDO0lBQ25ELElBQUksQ0FBQ0gsTUFBTSxFQUFFO01BQ1RGLHNCQUFzQixDQUFDLGdDQUFnQyxDQUFDO0lBQzVEO0VBQ0o7RUFFQSxlQUFlTSxRQUFRQSxDQUFBLEVBQUc7SUFDdEIsSUFBSUMsTUFBTSxHQUFHLE1BQU1KLE1BQU0sQ0FBQ0MsV0FBVyxDQUFDRSxRQUFRLENBQUMsQ0FBQztFQUNwRDtFQUVBLG9CQUNJWixnREFBQSxDQUFBQSwyQ0FBQSxxQkFDSUEsZ0RBQUEsYUFBSSwwQkFBNEIsQ0FBQyxlQUNqQ0EsZ0RBQUE7SUFBS2dCLE9BQU8sRUFBRVQ7RUFBUyxHQUFDLFdBQWMsQ0FBQyxlQUN2Q1AsZ0RBQUEsV0FBSSxDQUFDLGVBQ0xBLGdEQUFBLGFBQUksNkJBQStCLENBQUMsZUFDcENBLGdEQUFBO0lBQUtnQixPQUFPLEVBQUVKO0VBQVMsR0FBQyxXQUFjLENBQ3hDLENBQUM7QUFFWCIsInNvdXJjZXMiOlsid2VicGFjazovL2ZhbWlseS12aW5lLy4vc3JjL2NvbXBvbmVudHMvZXhhbXBsZS5qc3g/NzliNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEV4YW1wbGUoKSB7XG4gICAgLy8gQ3JlYXRlIHN0YXRlIGZvciBmaWxlcGF0aFxuICAgIGNvbnN0IFtmaWxlcGF0aCwgc2V0RmlsZVBhdGhdID0gdXNlU3RhdGUoXCJcIik7XG4gICAgY29uc3QgW21lZGlhQ3JlYXRpb25TdGF0dXMsIHNldE1lZGlhQ3JlYXRpb25TdGF0dXNdID0gdXNlU3RhdGUoXCJcIik7XG5cbiAgICAvLyBPcGVuIGEgZmlsZSBkaWFsb2cgYW5kIHVwZGF0ZSB0aGUgZmlsZXBhdGhcbiAgICBhc3luYyBmdW5jdGlvbiBhZGRNZWRpYSgpIHtcbiAgICAgICAgbGV0IGZhaWxlZCA9IGF3YWl0IHdpbmRvdy5lbGVjdHJvbkFQSS5jcmVhdGVNZWRpYSgpO1xuICAgICAgICBpZiAoIWZhaWxlZCkge1xuICAgICAgICAgICAgc2V0TWVkaWFDcmVhdGlvblN0YXR1cyhcIlN1Y2Vzc2Z1bGx5IGFkZGVkIG1lZGlhIHRvIERCIVwiKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0TWVkaWEoKSB7XG4gICAgICAgIGxldCBtZWRpYXMgPSBhd2FpdCB3aW5kb3cuZWxlY3Ryb25BUEkuZ2V0TWVkaWEoKVxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAgIDw+XG4gICAgICAgICAgICA8aDI+VHJ5IHRvIEFkZCBNZWRpYSB0byBEQjogPC9oMj5cbiAgICAgICAgICAgIDxidG4gb25DbGljaz17YWRkTWVkaWF9PkFkZCBNZWRpYTwvYnRuPlxuICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgIDxoMj5UcnkgdG8gUmVhZCBNZWRpYSBmcm9tIERCOiA8L2gyPlxuICAgICAgICAgICAgPGJ0biBvbkNsaWNrPXtnZXRNZWRpYX0+R2V0IE1lZGlhPC9idG4+XG4gICAgICAgIDwvPlxuICAgIClcbn1cbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwiRXhhbXBsZSIsImZpbGVwYXRoIiwic2V0RmlsZVBhdGgiLCJtZWRpYUNyZWF0aW9uU3RhdHVzIiwic2V0TWVkaWFDcmVhdGlvblN0YXR1cyIsImFkZE1lZGlhIiwiZmFpbGVkIiwid2luZG93IiwiZWxlY3Ryb25BUEkiLCJjcmVhdGVNZWRpYSIsImdldE1lZGlhIiwibWVkaWFzIiwiY3JlYXRlRWxlbWVudCIsIkZyYWdtZW50Iiwib25DbGljayJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/example.jsx\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("bc9358a6867312b9c5dd")
/******/ })();
/******/ 
/******/ }
);