webpackHotUpdate(0,{

/***/ 313:
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

	var _tagActions = __webpack_require__(310);

	var _Tag = __webpack_require__(314);

	var _Tag2 = _interopRequireDefault(_Tag);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TagsContainer = function (_React$Component) {
	  _inherits(TagsContainer, _React$Component);

	  function TagsContainer(props) {
	    _classCallCheck(this, TagsContainer);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(TagsContainer).call(this, props));
	  }

	  _createClass(TagsContainer, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.props.fetchTags();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      console.log('TAGS => ', this.props.tags);
	      return _react2.default.createElement(
	        'div',
	        null,
	        this.props.tags.map(function (tag) {
	          return _react2.default.createElement(_Tag2.default, _extends({ key: tag.id }, tag));
	        }),
	        ';'
	      );
	    }
	  }]);

	  return TagsContainer;
	}(_react2.default.Component);

	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    tags: state.tags
	  };
	};

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return (0, _redux.bindActionCreators)({ fetchTags: _tagActions.fetchTagsAction }, dispatch);
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(TagsContainer);

	// const TagsContainer = ({tags}) => (
	//   <div>
	//     {tags.map( (tag) =>
	//       <Tag key={tag.id}{...tag} />
	//     )}
	//   </div>
	// );

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(284); if (makeExportsHot(module, __webpack_require__(146))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "TagsContainer.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ }

})