webpackHotUpdate(0,{

/***/ 311:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(77), RootInstanceProvider = __webpack_require__(85), ReactMount = __webpack_require__(87), React = __webpack_require__(146); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(146);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(253);

	var _redux = __webpack_require__(260);

	var _Card = __webpack_require__(312);

	var _Card2 = _interopRequireDefault(_Card);

	var _actionTypes = __webpack_require__(290);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AllCardsContainer = function (_React$Component) {
	  _inherits(AllCardsContainer, _React$Component);

	  function AllCardsContainer(props) {
	    _classCallCheck(this, AllCardsContainer);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(AllCardsContainer).call(this, props));
	  }

	  _createClass(AllCardsContainer, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.props.fetchCards(); // async!!!
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      console.log('cards: ', this.props.cards);
	      return _react2.default.createElement(
	        'div',
	        null,
	        this.props.cards.map(function (card) {
	          return _react2.default.createElement(_Card2.default, _extends({
	            key: card.id
	          }, card));
	        })
	      );
	    }
	  }]);

	  return AllCardsContainer;
	}(_react2.default.Component);

	;

	// state passed in is application state
	var mapStateToProps = function mapStateToProps(state) {
	  console.log('state inside mapStateToProps: ', state);
	  // whatever is returned will show up as props inside AllCardsContainer
	  // will re-render whenever application state changes
	  return {
	    cards: state.cards
	  };
	};

	// anything returned will end up as props on AllCards container
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  console.log('is mapDispatchToProps working?', _actionTypes.fetchCardsAction);
	  // whenever an action is called, result should be passed to all reducers
	  return (0, _redux.bindActionCreators)({ fetchCards: _actionTypes.fetchCardsAction }, dispatch);
	  // inside container: can call this.props.fetchCards
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AllCardsContainer);

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(284); if (makeExportsHot(module, __webpack_require__(146))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "AllCardsContainer.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ }

})