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

var _AutosizeInput = require('./AutosizeInput.react');

var _AutosizeInput2 = _interopRequireDefault(_AutosizeInput);

var _Token = require('./Token.react');

var _Token2 = _interopRequireDefault(_Token);

var _utils = require('./utils/');

var _hintContainer = require('./containers/hintContainer');

var _hintContainer2 = _interopRequireDefault(_hintContainer);

var _inputContainer = require('./containers/inputContainer');

var _inputContainer2 = _interopRequireDefault(_inputContainer);

var _keyCode = require('./constants/keyCode');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HintedAutosizeInput = (0, _hintContainer2.default)(_AutosizeInput2.default);

var TypeaheadInputMulti = function (_React$Component) {
  _inherits(TypeaheadInputMulti, _React$Component);

  function TypeaheadInputMulti() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TypeaheadInputMulti);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TypeaheadInputMulti.__proto__ || Object.getPrototypeOf(TypeaheadInputMulti)).call.apply(_ref, [this].concat(args))), _this), _this._renderToken = function (option, idx) {
      var _this$props = _this.props,
          _onRemove = _this$props.onRemove,
          renderToken = _this$props.renderToken;

      var props = _extends({}, _this.props, {
        onRemove: function onRemove() {
          return _onRemove(option);
        }
      });

      return renderToken(option, props, idx);
    }, _this._handleContainerClickOrFocus = function (e) {
      // Don't focus the input if it's disabled.
      if (_this.props.disabled) {
        e.target.blur();
        return;
      }

      // Move cursor to the end if the user clicks outside the actual input.
      var inputNode = _this._input;
      if (e.target !== inputNode) {
        inputNode.selectionStart = inputNode.value.length;
      }

      inputNode.focus();
    }, _this._handleKeyDown = function (e) {
      var _this$props2 = _this.props,
          onKeyDown = _this$props2.onKeyDown,
          selected = _this$props2.selected,
          value = _this$props2.value;


      switch (e.keyCode) {
        case _keyCode.BACKSPACE:
          if (e.target === _this._input && selected.length && !value) {
            // If the input is selected and there is no text, focus the last
            // token when the user hits backspace.
            var children = _this._wrapper.children;
            var lastToken = children[children.length - 2];
            lastToken && lastToken.focus();
          }
          break;
      }

      onKeyDown(e);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TypeaheadInputMulti, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          inputClassName = _props.inputClassName,
          labelKey = _props.labelKey,
          onRemove = _props.onRemove,
          renderToken = _props.renderToken,
          selected = _props.selected,
          props = _objectWithoutProperties(_props, ['className', 'inputClassName', 'labelKey', 'onRemove', 'renderToken', 'selected']);

      return (
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        /* eslint-disable jsx-a11y/click-events-have-key-events */
        _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)('form-control', 'rbt-input-multi', className),
            disabled: props.disabled,
            onClick: this._handleContainerClickOrFocus,
            onFocus: this._handleContainerClickOrFocus,
            tabIndex: -1 },
          _react2.default.createElement(
            'div',
            { className: 'rbt-input-wrapper', ref: function ref(el) {
                return _this2._wrapper = el;
              } },
            selected.map(this._renderToken),
            _react2.default.createElement(HintedAutosizeInput, _extends({}, props, {
              inputClassName: (0, _classnames2.default)('rbt-input-main', inputClassName),
              inputRef: function inputRef(input) {
                _this2._input = input;
                _this2.props.inputRef(input);
              },
              inputStyle: {
                backgroundColor: 'transparent',
                border: 0,
                boxShadow: 'none',
                cursor: 'inherit',
                outline: 'none',
                padding: 0
              },
              onKeyDown: this._handleKeyDown,
              style: {
                position: 'relative',
                zIndex: 1
              }
            }))
          )
        )
        /* eslint-enable jsx-a11y/no-static-element-interactions */
        /* eslint-enable jsx-a11y/click-events-have-key-events */

      );
    }

    /**
     * Forward click or focus events on the container element to the input.
     */

  }]);

  return TypeaheadInputMulti;
}(_react2.default.Component);

TypeaheadInputMulti.propTypes = {
  /**
   * Provides a hook for customized rendering of tokens when multiple
   * selections are enabled.
   */
  renderToken: _propTypes2.default.func
};

TypeaheadInputMulti.defaultProps = {
  renderToken: function renderToken(option, props, idx) {
    return _react2.default.createElement(
      _Token2.default,
      {
        disabled: props.disabled,
        key: idx,
        onRemove: props.onRemove,
        tabIndex: props.tabIndex },
      (0, _utils.getOptionLabel)(option, props.labelKey)
    );
  }
};

exports.default = (0, _inputContainer2.default)(TypeaheadInputMulti);