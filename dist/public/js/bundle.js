/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	//import { render } from 'react-dom'
	//render(require('./routes'), document.body);

	'use strict';

	var React = __webpack_require__(1);
	var Router = __webpack_require__(2);
	var DefaultRoute = Router.DefaultRoute;
	var Route = Router.Route;
	var Routes = Router.Routes;

	var routes = __webpack_require__(3);

	Router.run(routes, Router.HistoryLocation, function (Handler) {
	  React.render(React.createElement(Handler, null), document.body);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(2);

	var _componentsMain = __webpack_require__(4);

	var _componentsMain2 = _interopRequireDefault(_componentsMain);

	var _componentsAbout = __webpack_require__(6);

	var _componentsAbout2 = _interopRequireDefault(_componentsAbout);

	exports['default'] = _react2['default'].createElement(
	  _reactRouter.Route,
	  { name: 'root', path: '/', component: _componentsMain2['default'] },
	  _react2['default'].createElement(_reactRouter.Route, { name: 'root', path: 'about', component: _componentsAbout2['default'] })
	);
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Message = __webpack_require__(5);

	var _Message2 = _interopRequireDefault(_Message);

	exports["default"] = _react2["default"].createClass({
	  displayName: "Main",

	  render: function render() {
	    return _react2["default"].createElement(_Message2["default"], { name: "World" });
	  }
	});
	module.exports = exports["default"];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(2);

	exports["default"] = _react2["default"].createClass({
	  displayName: "Message",

	  render: function render() {
	    return _react2["default"].createElement(
	      "div",
	      null,
	      "Hello, ",
	      this.props.name,
	      " ",
	      typeof this.props.name,
	      "!",
	      _react2["default"].createElement(
	        _reactRouter.Link,
	        { to: "/about" },
	        "Go to about"
	      )
	    );
	  }
	});
	module.exports = exports["default"];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(2);

	exports["default"] = _react2["default"].createClass({
	  displayName: "About",

	  render: function render() {
	    return _react2["default"].createElement(
	      "div",
	      null,
	      "About, ",
	      this.props.name,
	      "!",
	      _react2["default"].createElement(
	        _reactRouter.Link,
	        { to: "/" },
	        "Back to home"
	      )
	    );
	  }
	});
	module.exports = exports["default"];

/***/ }
/******/ ]);