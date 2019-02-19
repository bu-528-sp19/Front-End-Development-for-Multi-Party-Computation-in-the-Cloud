'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _hintContainer = require('./containers/hintContainer');

var _hintContainer2 = _interopRequireDefault(_hintContainer);

var _inputContainer = require('./containers/inputContainer');

var _inputContainer2 = _interopRequireDefault(_inputContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TypeaheadInputSingle = function (_React$Component) {
  _inherits(TypeaheadInputSingle, _React$Component);

  function TypeaheadInputSingle() {
    _classCallCheck(this, TypeaheadInputSingle);

    return _possibleConstructorReturn(this, (TypeaheadInputSingle.__proto__ || Object.getPrototypeOf(TypeaheadInputSingle)).apply(this, arguments));
  }

  _createClass(TypeaheadInputSingle, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          inputRef = _props.inputRef,
          props = _objectWithoutProperties(_props, ['className', 'inputRef']);

      return _react2.default.createElement('input', _extends({}, props, {
        className: (0, _classnames2.default)('rbt-input-main', 'form-control', className),
        ref: inputRef,
        type: 'text'
      }));
    }
  }]);

  return TypeaheadInputSingle;
}(_react2.default.Component);

exports.default = (0, _inputContainer2.default)((0, _hintContainer2.default)(TypeaheadInputSingle));