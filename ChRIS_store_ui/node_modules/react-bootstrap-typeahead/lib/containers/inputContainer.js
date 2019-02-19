'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../utils/');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function inputContainer(Input) {
  var WrappedInput = function (_React$Component) {
    _inherits(WrappedInput, _React$Component);

    function WrappedInput() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, WrappedInput);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WrappedInput.__proto__ || Object.getPrototypeOf(WrappedInput)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        isFocused: false
      }, _this._handleBlur = function (e) {
        e.persist();
        _this.setState({ isFocused: false }, function () {
          return _this.props.onBlur(e);
        });
      }, _this._handleFocus = function (e) {
        e.persist();
        _this.setState({ isFocused: true }, function () {
          return _this.props.onFocus(e);
        });
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(WrappedInput, [{
      key: 'getChildContext',
      value: function getChildContext() {
        var _props = this.props,
            initialItem = _props.initialItem,
            onAdd = _props.onAdd,
            selectHintOnEnter = _props.selectHintOnEnter;


        return {
          hintText: (0, _utils.getHintText)(this.props),
          initialItem: initialItem,
          onAdd: onAdd,
          selectHintOnEnter: selectHintOnEnter
        };
      }
    }, {
      key: 'render',
      value: function render() {
        var _cx;

        var _props2 = this.props,
            activeIndex = _props2.activeIndex,
            bsSize = _props2.bsSize,
            disabled = _props2.disabled,
            inputRef = _props2.inputRef,
            isInvalid = _props2.isInvalid,
            isMenuShown = _props2.isMenuShown,
            isValid = _props2.isValid,
            labelKey = _props2.labelKey,
            menuId = _props2.menuId,
            multiple = _props2.multiple,
            onChange = _props2.onChange,
            onKeyDown = _props2.onKeyDown,
            onRemove = _props2.onRemove,
            placeholder = _props2.placeholder,
            renderToken = _props2.renderToken,
            selected = _props2.selected;

        // Add a11y-related props.

        var inputProps = _extends({}, this.props.inputProps, {
          'aria-activedescendant': activeIndex >= 0 ? (0, _utils.getMenuItemId)(activeIndex) : '',
          'aria-autocomplete': multiple ? 'list' : 'both',
          'aria-expanded': isMenuShown,
          'aria-haspopup': 'listbox',
          'aria-owns': menuId,
          autoComplete: this.props.inputProps.autoComplete || 'nope',
          disabled: disabled,
          inputRef: inputRef,
          onBlur: this._handleBlur,
          onChange: onChange,
          // Re-open the menu, eg: if it's closed via ESC.
          onClick: this._handleFocus,
          onFocus: this._handleFocus,
          onKeyDown: onKeyDown,
          placeholder: selected.length ? null : placeholder,
          // Comboboxes are single-select by definition:
          // https://www.w3.org/TR/wai-aria-practices-1.1/#combobox
          role: 'combobox',
          value: (0, _utils.getInputText)(this.props)
        });

        var className = inputProps.className || '';

        if (multiple) {
          inputProps = _extends({}, inputProps, {
            inputClassName: className,
            labelKey: labelKey,
            onRemove: onRemove,
            renderToken: renderToken,
            role: '',
            selected: selected
          });
        }

        return _react2.default.createElement(Input, _extends({}, inputProps, {
          className: (0, _classnames2.default)('rbt-input', (_cx = {}, _defineProperty(_cx, className, !multiple), _defineProperty(_cx, 'focus', this.state.isFocused), _defineProperty(_cx, 'input-lg form-control-lg', bsSize === 'large' || bsSize === 'lg'), _defineProperty(_cx, 'input-sm form-control-sm', bsSize === 'small' || bsSize === 'sm'), _defineProperty(_cx, 'is-invalid', isInvalid), _defineProperty(_cx, 'is-valid', isValid), _cx))
        }));
      }
    }]);

    return WrappedInput;
  }(_react2.default.Component);

  WrappedInput.displayName = 'InputContainer(' + (0, _utils.getDisplayName)(Input) + ')';

  WrappedInput.childContextTypes = {
    hintText: _propTypes2.default.string.isRequired,
    initialItem: _propTypes2.default.oneOfType([_propTypes2.default.object.isRequired, _propTypes2.default.string.isRequired]),
    onAdd: _propTypes2.default.func.isRequired,
    selectHintOnEnter: _propTypes2.default.bool.isRequired
  };

  return WrappedInput;
}

exports.default = inputContainer;