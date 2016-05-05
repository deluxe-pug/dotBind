webpackHotUpdate(0,{

/***/ 288:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(77), RootInstanceProvider = __webpack_require__(85), ReactMount = __webpack_require__(87), React = __webpack_require__(146); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(146);

	var _react2 = _interopRequireDefault(_react);

	var _AddCardContainer = __webpack_require__(289);

	var _AddCardContainer2 = _interopRequireDefault(_AddCardContainer);

	var _AddTagContainer = __webpack_require__(309);

	var _AddTagContainer2 = _interopRequireDefault(_AddTagContainer);

	var _AllCardsContainer = __webpack_require__(311);

	var _AllCardsContainer2 = _interopRequireDefault(_AllCardsContainer);

	var _TagsContainer = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../containers/TagsContainer\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _TagsContainer2 = _interopRequireDefault(_TagsContainer);

	var _Sidebar = __webpack_require__(315);

	var _Sidebar2 = _interopRequireDefault(_Sidebar);

	var _NavBar = __webpack_require__(316);

	var _NavBar2 = _interopRequireDefault(_NavBar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(318);

	var App = function App() {
	  return _react2.default.createElement(
	    'div',
	    null,
	    _react2.default.createElement(
	      'header',
	      null,
	      _react2.default.createElement(
	        'div',
	        { id: 'slide-out', className: 'side-nav fixed' },
	        _react2.default.createElement(_Sidebar2.default, null)
	      )
	    ),
	    _react2.default.createElement(
	      'main',
	      null,
	      _react2.default.createElement(_NavBar2.default, null),
	      _react2.default.createElement(_AddCardContainer2.default, null),
	      _react2.default.createElement(_AllCardsContainer2.default, null)
	    )
	  );
	};

	exports.default = App;

	// <div className="container">
	//   <a href="#"
	//      data-activates="slide-out"
	//      className="button-collapse top-nav full hide-on-large-only">
	//     <i className="material-icons">menu</i>
	//   </a>
	// </div>

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(284); if (makeExportsHot(module, __webpack_require__(146))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "App.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ },

/***/ 315:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(77), RootInstanceProvider = __webpack_require__(85), ReactMount = __webpack_require__(87), React = __webpack_require__(146); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(146);

	var _react2 = _interopRequireDefault(_react);

	var _TagsContainer = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../containers/TagsContainer\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _TagsContainer2 = _interopRequireDefault(_TagsContainer);

	var _AddTagContainer = __webpack_require__(309);

	var _AddTagContainer2 = _interopRequireDefault(_AddTagContainer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Sidebar = function Sidebar() {
	  return _react2.default.createElement(
	    'div',
	    null,
	    _react2.default.createElement(_AddTagContainer2.default, null),
	    _react2.default.createElement(_TagsContainer2.default, null)
	  );
	};

	exports.default = Sidebar;

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(284); if (makeExportsHot(module, __webpack_require__(146))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "Sidebar.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ }

})