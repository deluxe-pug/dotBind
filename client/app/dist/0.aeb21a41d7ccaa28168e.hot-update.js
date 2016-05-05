webpackHotUpdate(0,{

/***/ 282:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(77), RootInstanceProvider = __webpack_require__(85), ReactMount = __webpack_require__(87), React = __webpack_require__(146); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(260);

	var _cardsReducer = __webpack_require__(283);

	var _cardsReducer2 = _interopRequireDefault(_cardsReducer);

	var _tagsReducer = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./tagsReducer\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _tagsReducer2 = _interopRequireDefault(_tagsReducer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// mapping to application state
	// each key has each reducer, each piece of state
	var appReducer = (0, _redux.combineReducers)({
	  cards: _cardsReducer2.default,
	  tags: _tagsReducer2.default
	});

	exports.default = appReducer;

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(284); if (makeExportsHot(module, __webpack_require__(146))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "appReducer.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ }

})