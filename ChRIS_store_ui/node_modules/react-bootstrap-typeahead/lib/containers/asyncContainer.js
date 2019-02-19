'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../utils/');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_DELAY_MS = 200;

/**
 * HoC that encapsulates common behavior and functionality for doing
 * asynchronous searches, including:
 *
 *  - Debouncing user input
 *  - Query caching (optional)
 *  - Search prompt and empty results behaviors
 */
var asyncContainer = function asyncContainer(Typeahead) {
  var WrappedTypeahead = function (_React$Component) {
    _inherits(WrappedTypeahead, _React$Component);

    function WrappedTypeahead() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, WrappedTypeahead);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WrappedTypeahead.__proto__ || Object.getPrototypeOf(WrappedTypeahead)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        query: ''
      }, _this._getEmptyLabel = function () {
        var _this$props = _this.props,
            emptyLabel = _this$props.emptyLabel,
            isLoading = _this$props.isLoading,
            promptText = _this$props.promptText,
            searchText = _this$props.searchText,
            useCache = _this$props.useCache;
        var query = _this.state.query;


        if (!query.length) {
          return promptText;
        }

        if (isLoading || useCache && !_this._cache[query]) {
          return searchText;
        }

        return emptyLabel;
      }, _this._handleInputChange = function (query, e) {
        _this.props.onInputChange && _this.props.onInputChange(query, e);
        _this._handleSearchDebounced(query);
      }, _this._handleSearch = function (query) {
        var _this$props2 = _this.props,
            minLength = _this$props2.minLength,
            onSearch = _this$props2.onSearch,
            useCache = _this$props2.useCache;


        _this.setState({ query: query });

        if (!query || minLength && query.length < minLength) {
          return;
        }

        // Use cached results, if available.
        if (useCache && _this._cache[query]) {
          return;
        }

        // Perform the search.
        onSearch(query);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(WrappedTypeahead, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this._cache = {};
        this._handleSearchDebounced = (0, _debounce2.default)(this._handleSearch, this.props.delay);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var options = nextProps.options,
            useCache = nextProps.useCache;


        if (!this.props.isLoading) {
          return;
        }

        if (useCache) {
          this._cache[this.state.query] = options;
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this._cache = {};
        this._handleSearchDebounced.cancel();
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props,
            options = _props.options,
            useCache = _props.useCache,
            props = _objectWithoutProperties(_props, ['options', 'useCache']);

        var cachedQuery = this._cache[this.state.query];
        var emptyLabel = this._getEmptyLabel();

        // Short-circuit the creation of custom selections while the user is in
        // the process of searching. The logic for whether or not to display the
        // custom menu option is basically the same as whether we display the
        // empty label, so use that as a proxy.
        var allowNew = props.allowNew && emptyLabel === props.emptyLabel;
        // Unless allowNew is a function,
        // in which case it is up to the function to decide
        if (typeof props.allowNew === 'function') {
          allowNew = props.allowNew;
        }

        return _react2.default.createElement(Typeahead, _extends({}, props, {
          allowNew: allowNew,
          emptyLabel: emptyLabel,
          onInputChange: this._handleInputChange,
          options: useCache && cachedQuery ? cachedQuery : options,
          ref: function ref(instance) {
            return _this2._instance = instance;
          }
        }));
      }

      /**
       * Make the component instance available.
       */

    }, {
      key: 'getInstance',
      value: function getInstance() {
        return this._instance.getInstance();
      }
    }]);

    return WrappedTypeahead;
  }(_react2.default.Component);

  WrappedTypeahead.displayName = 'AsyncContainer(' + (0, _utils.getDisplayName)(Typeahead) + ')';

  WrappedTypeahead.propTypes = {
    /**
     * Delay, in milliseconds, before performing search.
     */
    delay: _propTypes2.default.number,
    /**
     * Whether or not a request is currently pending. Necessary for the
     * container to know when new results are available.
     */
    isLoading: _propTypes2.default.bool.isRequired,
    /**
     * Callback to perform when the search is executed.
     */
    onSearch: _propTypes2.default.func.isRequired,
    /**
     * Options to be passed to the typeahead. Will typically be the query
     * results, but can also be initial default options.
     */
    options: _propTypes2.default.array,
    /**
     * Message displayed in the menu when there is no user input.
     */
    promptText: _propTypes2.default.node,
    /**
     * Message displayed in the menu while the request is pending.
     */
    searchText: _propTypes2.default.node,
    /**
     * Whether or not the component should cache query results.
     */
    useCache: _propTypes2.default.bool
  };

  WrappedTypeahead.defaultProps = {
    delay: DEFAULT_DELAY_MS,
    minLength: 2,
    options: [],
    promptText: 'Type to search...',
    searchText: 'Searching...',
    useCache: true
  };

  return WrappedTypeahead;
};

exports.default = asyncContainer;