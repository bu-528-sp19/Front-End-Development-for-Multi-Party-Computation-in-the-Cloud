'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../utils/');

var _keyCode = require('../constants/keyCode');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// IE doesn't seem to get the composite computed value (eg: 'padding',
// 'borderStyle', etc.), so generate these from the individual values.
function interpolateStyle(styles, attr) {
  var subattr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  // Title-case the sub-attribute.
  if (subattr) {
    subattr = subattr.replace(subattr[0], subattr[0].toUpperCase());
  }

  return ['Top', 'Right', 'Bottom', 'Left'].map(function (dir) {
    return styles[attr + dir + subattr];
  }).join(' ');
}

function copyStyles(inputNode, hintNode) {
  var inputStyle = window.getComputedStyle(inputNode);

  hintNode.style.borderStyle = interpolateStyle(inputStyle, 'border', 'style');
  hintNode.style.borderWidth = interpolateStyle(inputStyle, 'border', 'width');
  hintNode.style.fontSize = inputStyle.fontSize;
  hintNode.style.lineHeight = inputStyle.lineHeight;
  hintNode.style.margin = interpolateStyle(inputStyle, 'margin');
  hintNode.style.padding = interpolateStyle(inputStyle, 'padding');
}

function hintContainer(Input) {
  var HintedInput = function (_React$Component) {
    _inherits(HintedInput, _React$Component);

    function HintedInput() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, HintedInput);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = HintedInput.__proto__ || Object.getPrototypeOf(HintedInput)).call.apply(_ref, [this].concat(args))), _this), _this._handleKeyDown = function (e) {
        var _this$context = _this.context,
            hintText = _this$context.hintText,
            initialItem = _this$context.initialItem,
            onAdd = _this$context.onAdd,
            selectHintOnEnter = _this$context.selectHintOnEnter;
        var _this$props = _this.props,
            onKeyDown = _this$props.onKeyDown,
            value = _this$props.value;


        if (hintText && (e.keyCode === _keyCode.RETURN && selectHintOnEnter || e.keyCode === _keyCode.RIGHT && e.target.selectionStart === value.length || e.keyCode === _keyCode.TAB)) {
          e.preventDefault(); // Prevent input from blurring on TAB.
          onAdd(initialItem);
        }

        onKeyDown(e);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(HintedInput, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        copyStyles(this._input, this._hint);
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        copyStyles(this._input, this._hint);
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        return _react2.default.createElement(
          'div',
          {
            className: 'rbt-input-hint-container',
            style: { position: 'relative' } },
          _react2.default.createElement(Input, _extends({}, this.props, {
            inputRef: function inputRef(input) {
              _this2._input = input;
              _this2.props.inputRef(input);
            },
            onKeyDown: this._handleKeyDown
          })),
          _react2.default.createElement('input', {
            'aria-hidden': true,
            className: 'rbt-input-hint',
            readOnly: true,
            ref: function ref(hint) {
              return _this2._hint = hint;
            },
            style: {
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              boxShadow: 'none',
              color: 'rgba(0, 0, 0, 0.35)',
              left: 0,
              pointerEvents: 'none',
              position: 'absolute',
              top: 0
            },
            tabIndex: -1,
            value: this.context.hintText
          })
        );
      }
    }]);

    return HintedInput;
  }(_react2.default.Component);

  HintedInput.displayName = 'HintContainer(' + (0, _utils.getDisplayName)(Input) + ')';

  HintedInput.contextTypes = {
    hintText: _propTypes2.default.string.isRequired,
    initialItem: _propTypes2.default.oneOfType([_propTypes2.default.object.isRequired, _propTypes2.default.string.isRequired]),
    onAdd: _propTypes2.default.func.isRequired,
    selectHintOnEnter: _propTypes2.default.bool.isRequired
  };

  return HintedInput;
}

exports.default = hintContainer;