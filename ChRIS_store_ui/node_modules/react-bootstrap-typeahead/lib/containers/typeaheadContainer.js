'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _flowRight = require('lodash/flowRight');

var _flowRight2 = _interopRequireDefault(_flowRight);

var _head = require('lodash/head');

var _head2 = _interopRequireDefault(_head);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _uniqueId = require('lodash/uniqueId');

var _uniqueId2 = _interopRequireDefault(_uniqueId);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _highlightOnlyResultContainer = require('./highlightOnlyResultContainer');

var _highlightOnlyResultContainer2 = _interopRequireDefault(_highlightOnlyResultContainer);

var _propTypes3 = require('../propTypes/');

var _utils = require('../utils/');

var _defaultLabelKey = require('../constants/defaultLabelKey');

var _keyCode = require('../constants/keyCode');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function genId() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return prefix + Math.random().toString(36).substr(2, 12);
}

function getInitialState(props) {
  var defaultInputValue = props.defaultInputValue,
      defaultSelected = props.defaultSelected,
      maxResults = props.maxResults,
      multiple = props.multiple;


  var selected = props.selected ? props.selected.slice() : defaultSelected.slice();

  var text = defaultInputValue;

  if (!multiple && selected.length) {
    // Set the text if an initial selection is passed in.
    text = (0, _utils.getOptionLabel)((0, _head2.default)(selected), props.labelKey);

    if (selected.length > 1) {
      // Limit to 1 selection in single-select mode.
      selected = selected.slice(0, 1);
    }
  }

  return {
    activeIndex: -1,
    activeItem: null,
    initialItem: null,
    selected: selected,
    showMenu: false,
    shownResults: maxResults,
    text: text
  };
}

function typeaheadContainer(Typeahead) {
  // Nested HOCs to encapsulate behaviors. In order from outer to inner.
  Typeahead = (0, _flowRight2.default)(_highlightOnlyResultContainer2.default)(Typeahead);

  var WrappedTypeahead = function (_React$Component) {
    _inherits(WrappedTypeahead, _React$Component);

    function WrappedTypeahead(props) {
      _classCallCheck(this, WrappedTypeahead);

      var _this = _possibleConstructorReturn(this, (WrappedTypeahead.__proto__ || Object.getPrototypeOf(WrappedTypeahead)).call(this, props));

      _this.blur = function () {
        _this.getInput().blur();
        _this._hideMenu();
      };

      _this.clear = function () {
        _this.setState(_extends({}, getInitialState(_this.props), {
          selected: [],
          text: ''
        }));
      };

      _this.focus = function () {
        _this.getInput().focus();
      };

      _this.getInput = function () {
        return _this._input;
      };

      _this._handleActiveIndexChange = function (activeIndex) {
        var newState = { activeIndex: activeIndex };

        if (activeIndex === -1) {
          // Reset the active item if there is no active index.
          newState.activeItem = null;
        }

        _this.setState(newState);
      };

      _this._handleActiveItemChange = function (activeItem) {
        _this.setState({ activeItem: activeItem });
      };

      _this._handleClear = function () {
        _this.clear();
        _this._updateSelected([]);
      };

      _this._handleFocus = function (e) {
        _this.setState({ showMenu: true }, function () {
          return _this.props.onFocus(e);
        });
      };

      _this._handleInitialItemChange = function (initialItem) {
        var labelKey = _this.props.labelKey;

        var currentItem = _this.state.initialItem;

        // Don't update the initial item if it hasn't changed. For custom items,
        // compare the `labelKey` values since a unique id is generated each time,
        // causing the comparison to always return false otherwise.
        if ((0, _isEqual2.default)(initialItem, currentItem) || currentItem && initialItem && initialItem.customOption && initialItem[labelKey] === currentItem[labelKey]) {
          return;
        }

        _this.setState({ initialItem: initialItem });
      };

      _this._handleInputChange = function (e) {
        e.persist();

        var text = e.target.value;

        var _getInitialState = getInitialState(_this.props),
            activeIndex = _getInitialState.activeIndex,
            activeItem = _getInitialState.activeItem,
            shownResults = _getInitialState.shownResults;

        var _this$props = _this.props,
            multiple = _this$props.multiple,
            onInputChange = _this$props.onInputChange;


        _this.setState({
          activeIndex: activeIndex,
          activeItem: activeItem,
          showMenu: true,
          shownResults: shownResults,
          text: text
        }, function () {
          return onInputChange(text, e);
        });

        // Clear any selections if text is entered in single-select mode.
        if (_this.state.selected.length && !multiple) {
          _this._updateSelected([]);
        }
      };

      _this._handleKeyDown = function (e, results, isMenuShown) {
        var activeItem = _this.state.activeItem;


        switch (e.keyCode) {
          case _keyCode.UP:
          case _keyCode.DOWN:
            if (!isMenuShown) {
              _this._showMenu();
              break;
            }

            var activeIndex = _this.state.activeIndex;

            // Prevents input cursor from going to the beginning when pressing up.

            e.preventDefault();

            // Increment or decrement index based on user keystroke.
            activeIndex += e.keyCode === _keyCode.UP ? -1 : 1;

            // Skip over any disabled options.
            while (results[activeIndex] && results[activeIndex].disabled) {
              activeIndex += e.keyCode === _keyCode.UP ? -1 : 1;
            }

            // If we've reached the end, go back to the beginning or vice-versa.
            if (activeIndex === results.length) {
              activeIndex = -1;
            } else if (activeIndex === -2) {
              activeIndex = results.length - 1;
            }

            _this._handleActiveIndexChange(activeIndex);
            break;
          case _keyCode.ESC:
            isMenuShown && _this._hideMenu();
            break;
          case _keyCode.RETURN:
            if (!isMenuShown) {
              break;
            }

            // Prevent form submission while menu is open.
            e.preventDefault();
            activeItem && _this._handleMenuItemSelect(activeItem, e);
            break;
          case _keyCode.RIGHT:
          case _keyCode.TAB:
            if (!isMenuShown) {
              break;
            }

            if (activeItem && !activeItem.paginationOption) {
              // Prevent blurring when selecting the active item.
              e.keyCode === _keyCode.TAB && e.preventDefault();
              _this._handleSelectionAdd(activeItem);
              break;
            }

            if (e.keyCode === _keyCode.TAB) {
              _this._hideMenu();
            }
            break;
        }

        _this.props.onKeyDown(e);
      };

      _this._handleMenuItemSelect = function (option, e) {
        if (option.paginationOption) {
          _this._handlePaginate(e);
        } else {
          _this._handleSelectionAdd(option);
        }
      };

      _this._handlePaginate = function (e) {
        e.persist();
        var _this$props2 = _this.props,
            maxResults = _this$props2.maxResults,
            onPaginate = _this$props2.onPaginate;

        var shownResults = _this.state.shownResults + maxResults;

        _this.setState({ shownResults: shownResults }, function () {
          return onPaginate(e, shownResults);
        });
      };

      _this._handleSelectionAdd = function (selection) {
        var _this$props3 = _this.props,
            multiple = _this$props3.multiple,
            labelKey = _this$props3.labelKey;


        var selected = void 0;
        var text = void 0;

        if (multiple) {
          // If multiple selections are allowed, add the new selection to the
          // existing selections.
          selected = _this.state.selected.concat(selection);
          text = '';
        } else {
          // If only a single selection is allowed, replace the existing selection
          // with the new one.
          selected = [selection];
          text = (0, _utils.getOptionLabel)(selection, labelKey);
        }

        _this._hideMenu();
        _this.setState({
          initialItem: selection,
          text: text
        });

        // Text must be updated before the selection to fix #211.
        // TODO: Find a more robust way of solving the issue.
        _this._updateSelected(selected);
      };

      _this._handleSelectionRemove = function (selection) {
        var selected = _this.state.selected.filter(function (option) {
          return !(0, _isEqual2.default)(option, selection);
        });

        // Make sure the input stays focused after the item is removed.
        _this.focus();
        _this._hideMenu();
        _this._updateSelected(selected);
      };

      _this.handleClickOutside = function (e) {
        _this.state.showMenu && _this._hideMenu();
      };

      _this._hideMenu = function () {
        var _getInitialState2 = getInitialState(_this.props),
            activeIndex = _getInitialState2.activeIndex,
            activeItem = _getInitialState2.activeItem,
            showMenu = _getInitialState2.showMenu,
            shownResults = _getInitialState2.shownResults;

        _this.setState({
          activeIndex: activeIndex,
          activeItem: activeItem,
          showMenu: showMenu,
          shownResults: shownResults
        });
      };

      _this._showMenu = function () {
        _this.setState({ showMenu: true });
      };

      _this._updateSelected = function (selected) {
        _this.setState({ selected: selected }, function () {
          return _this.props.onChange(selected);
        });
      };

      _this.state = getInitialState(props);
      return _this;
    }

    _createClass(WrappedTypeahead, [{
      key: 'getChildContext',
      value: function getChildContext() {
        return {
          activeIndex: this.state.activeIndex,
          onActiveItemChange: this._handleActiveItemChange,
          onInitialItemChange: this._handleInitialItemChange,
          onMenuItemClick: this._handleMenuItemSelect
        };
      }
    }, {
      key: 'componentWillMount',
      value: function componentWillMount() {
        // Generate random id here since doing it in defaultProps will generate
        // the same id for every instance.
        this._menuId = genId('rbt-menu-');
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.props.autoFocus && this.focus();
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var labelKey = nextProps.labelKey,
            multiple = nextProps.multiple,
            selected = nextProps.selected;

        // If new selections are passed via props, treat as a controlled input.

        if (selected && !(0, _isEqual2.default)(selected, this.state.selected)) {
          this.setState({ selected: selected });

          if (multiple) {
            return;
          }

          this.setState({
            text: selected.length ? (0, _utils.getOptionLabel)((0, _head2.default)(selected), labelKey) : ''
          });
        }

        // Truncate selections when in single-select mode.
        var newSelected = selected || this.state.selected;
        if (!multiple && newSelected.length > 1) {
          newSelected = newSelected.slice(0, 1);
          this.setState({
            selected: newSelected,
            text: (0, _utils.getOptionLabel)((0, _head2.default)(newSelected), labelKey)
          });
          return;
        }

        if (multiple !== this.props.multiple) {
          this.setState({ text: '' });
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var mergedPropsAndState = _extends({}, this.props, this.state);

        var filterBy = mergedPropsAndState.filterBy,
            labelKey = mergedPropsAndState.labelKey,
            minLength = mergedPropsAndState.minLength,
            options = mergedPropsAndState.options,
            paginate = mergedPropsAndState.paginate,
            paginationText = mergedPropsAndState.paginationText,
            shownResults = mergedPropsAndState.shownResults,
            text = mergedPropsAndState.text;


        var results = [];
        if (text.length >= minLength) {
          var cb = Array.isArray(filterBy) ? _utils.defaultFilterBy : filterBy;
          results = options.filter(function (option) {
            return cb(option, mergedPropsAndState);
          });
        }

        // This must come before results are truncated.
        var shouldPaginate = paginate && results.length > shownResults;

        // Truncate results if necessary.
        results = (0, _utils.getTruncatedOptions)(results, shownResults);

        // Add the custom option if necessary.
        if ((0, _utils.addCustomOption)(results, mergedPropsAndState)) {
          results.push(_defineProperty({
            customOption: true,
            id: (0, _uniqueId2.default)('new-id-')
          }, (0, _utils.getStringLabelKey)(labelKey), text));
        }

        // Add the pagination item if necessary.
        if (shouldPaginate) {
          var _results$push2;

          results.push((_results$push2 = {}, _defineProperty(_results$push2, (0, _utils.getStringLabelKey)(labelKey), paginationText), _defineProperty(_results$push2, 'paginationOption', true), _results$push2));
        }

        // This must come after checks for the custom option and pagination.
        var isMenuShown = (0, _utils.isShown)(results, mergedPropsAndState);

        return _react2.default.createElement(Typeahead, _extends({}, mergedPropsAndState, {
          inputRef: function inputRef(input) {
            return _this2._input = input;
          },
          isMenuShown: isMenuShown,
          menuId: this.props.menuId || this._menuId,
          onAdd: this._handleSelectionAdd,
          onChange: this._handleInputChange,
          onClear: this._handleClear,
          onFocus: this._handleFocus,
          onInitialItemChange: this._handleInitialItemChange,
          onKeyDown: function onKeyDown(e) {
            return _this2._handleKeyDown(e, results, isMenuShown);
          },
          onRemove: this._handleSelectionRemove,
          results: results
        }));
      }

      /**
       * From `onClickOutside` HOC.
       */

    }]);

    return WrappedTypeahead;
  }(_react2.default.Component);

  WrappedTypeahead.displayName = 'TypeaheadContainer(' + (0, _utils.getDisplayName)(Typeahead) + ')';

  WrappedTypeahead.propTypes = {
    /**
     * For localized accessibility: Should return a string indicating the number
     * of results for screen readers. Receives the current results.
     */
    a11yNumResults: _propTypes2.default.func,
    /**
     * For localized accessibility: Should return a string indicating the number
     * of selections for screen readers. Receives the current selections.
     */
    a11yNumSelected: _propTypes2.default.func,
    /**
     * Specify menu alignment. The default value is `justify`, which makes the
     * menu as wide as the input and truncates long values. Specifying `left`
     * or `right` will align the menu to that side and the width will be
     * determined by the length of menu item values.
     */
    align: _propTypes2.default.oneOf(['justify', 'left', 'right']),
    /**
     * Allows the creation of new selections on the fly. Note that any new items
     * will be added to the list of selections, but not the list of original
     * options unless handled as such by `Typeahead`'s parent.
     *
     * If a function is specified, it will be used to determine whether a custom
     * option should be included. The return value should be true or false.
     */
    allowNew: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.func]),
    /**
     * Autofocus the input when the component initially mounts.
     */
    autoFocus: _propTypes2.default.bool,
    /**
     * Whether to render the menu inline or attach to `document.body`.
     */
    bodyContainer: _propTypes2.default.bool,
    /**
     * Whether or not filtering should be case-sensitive.
     */
    caseSensitive: (0, _propTypes3.checkPropType)(_propTypes2.default.bool, _propTypes3.caseSensitiveType),
    /**
     * Displays a button to clear the input when there are selections.
     */
    clearButton: _propTypes2.default.bool,
    /**
     * The initial value displayed in the text input.
     */
    defaultInputValue: (0, _propTypes3.checkPropType)(_propTypes2.default.string, _propTypes3.defaultInputValueType),
    /**
     * Specify any pre-selected options. Use only if you want the component to
     * be uncontrolled.
     */
    defaultSelected: _propTypes3.optionType,
    /**
     * Whether to disable the component.
     */
    disabled: _propTypes2.default.bool,
    /**
     * Specify whether the menu should appear above the input.
     */
    dropup: _propTypes2.default.bool,
    /**
     * Message to display in the menu if there are no valid results.
     */
    emptyLabel: _propTypes2.default.node,
    /**
     * Either an array of fields in `option` to search, or a custom filtering
     * callback.
     */
    filterBy: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.string.isRequired), _propTypes2.default.func]),
    /**
     * Whether or not to automatically adjust the position of the menu when it
     * reaches the viewport boundaries.
     */
    flip: _propTypes2.default.bool,
    /**
     * Highlights the menu item if there is only one result and allows selecting
     * that item by hitting enter. Does not work with `allowNew`.
     */
    highlightOnlyResult: (0, _propTypes3.checkPropType)(_propTypes2.default.bool, _propTypes3.highlightOnlyResultType),
    /**
     * Whether the filter should ignore accents and other diacritical marks.
     */
    ignoreDiacritics: (0, _propTypes3.checkPropType)(_propTypes2.default.bool, _propTypes3.ignoreDiacriticsType),
    /**
     * Props to be applied directly to the input. `onBlur`, `onChange`,
     * `onFocus`, and `onKeyDown` are ignored.
     */
    inputProps: (0, _propTypes3.checkPropType)(_propTypes2.default.object, _propTypes3.inputPropsType),
    /**
     * Bootstrap 4 only. Adds the `is-invalid` classname to the `form-control`.
     */
    isInvalid: _propTypes2.default.bool,
    /**
     * Indicate whether an asynchronous data fetch is happening.
     */
    isLoading: _propTypes2.default.bool,
    /**
     * Bootstrap 4 only. Adds the `is-valid` classname to the `form-control`.
     */
    isValid: _propTypes2.default.bool,
    /**
     * Specify the option key to use for display or a function returning the
     * display string. By default, the selector will use the `label` key.
     */
    labelKey: (0, _propTypes3.checkPropType)(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]), _propTypes3.labelKeyType),
    /**
     * Maximum number of results to display by default. Mostly done for
     * performance reasons so as not to render too many DOM nodes in the case of
     * large data sets.
     */
    maxResults: _propTypes2.default.number,
    /**
     * Id applied to the top-level menu element. Required for accessibility.
     */
    menuId: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    /**
     * Number of input characters that must be entered before showing results.
     */
    minLength: _propTypes2.default.number,
    /**
     * Whether or not multiple selections are allowed.
     */
    multiple: _propTypes2.default.bool,
    /**
     * Invoked when the input is blurred. Receives an event.
     */
    onBlur: _propTypes2.default.func,
    /**
     * Invoked whenever items are added or removed. Receives an array of the
     * selected options.
     */
    onChange: _propTypes2.default.func,
    /**
     * Invoked when the input is focused. Receives an event.
     */
    onFocus: _propTypes2.default.func,
    /**
     * Invoked when the input value changes. Receives the string value of the
     * input.
     */
    onInputChange: _propTypes2.default.func,
    /**
     * Invoked when a key is pressed. Receives an event.
     */
    onKeyDown: _propTypes2.default.func,
    /**
     * Invoked when the menu is hidden.
     */
    onMenuHide: _propTypes2.default.func,
    /**
     * Invoked when the menu is shown.
     */
    onMenuShow: _propTypes2.default.func,
    /**
     * Invoked when the pagination menu item is clicked. Receives an event.
     */
    onPaginate: _propTypes2.default.func,
    /**
     * Full set of options, including pre-selected options. Must either be an
     * array of objects (recommended) or strings.
     */
    options: _propTypes3.optionType.isRequired,
    /**
     * Give user the ability to display additional results if the number of
     * results exceeds `maxResults`.
     */
    paginate: _propTypes2.default.bool,
    /**
     * Prompt displayed when large data sets are paginated.
     */
    paginationText: _propTypes2.default.string,
    /**
     * Placeholder text for the input.
     */
    placeholder: _propTypes2.default.string,
    /**
     * Callback for custom menu rendering.
     */
    renderMenu: _propTypes2.default.func,
    /**
     * The selected option(s) displayed in the input. Use this prop if you want
     * to control the component via its parent.
     */
    selected: _propTypes3.optionType,
    /**
     * Allows selecting the hinted result by pressing enter.
     */
    selectHintOnEnter: _propTypes2.default.bool
  };

  WrappedTypeahead.defaultProps = {
    a11yNumResults: function a11yNumResults(results) {
      var resultString = (0, _utils.pluralize)('result', results.length);
      return resultString + '. Use up and down arrow keys to navigate.';
    },
    a11yNumSelected: function a11yNumSelected(selected) {
      return (0, _utils.pluralize)('selection', selected.length);
    },
    align: 'justify',
    allowNew: false,
    autoFocus: false,
    bodyContainer: false,
    caseSensitive: false,
    clearButton: false,
    defaultInputValue: '',
    defaultSelected: [],
    disabled: false,
    dropup: false,
    emptyLabel: 'No matches found.',
    filterBy: [],
    flip: false,
    highlightOnlyResult: false,
    ignoreDiacritics: true,
    inputProps: {},
    isInvalid: false,
    isLoading: false,
    isValid: false,
    labelKey: _defaultLabelKey.DEFAULT_LABELKEY,
    maxResults: 100,
    minLength: 0,
    multiple: false,
    onBlur: _noop2.default,
    onChange: _noop2.default,
    onFocus: _noop2.default,
    onInputChange: _noop2.default,
    onKeyDown: _noop2.default,
    onMenuHide: _noop2.default,
    onMenuShow: _noop2.default,
    onPaginate: _noop2.default,
    paginate: true,
    paginationText: 'Display additional results...',
    placeholder: '',
    selectHintOnEnter: false
  };

  WrappedTypeahead.childContextTypes = {
    activeIndex: _propTypes2.default.number.isRequired,
    onActiveItemChange: _propTypes2.default.func.isRequired,
    onInitialItemChange: _propTypes2.default.func.isRequired,
    onMenuItemClick: _propTypes2.default.func.isRequired
  };

  return (0, _reactOnclickoutside2.default)(WrappedTypeahead);
}

exports.default = typeaheadContainer;