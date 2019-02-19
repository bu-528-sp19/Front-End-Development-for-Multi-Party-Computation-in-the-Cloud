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

var _isRequiredForA11y = require('prop-types-extra/lib/isRequiredForA11y');

var _isRequiredForA11y2 = _interopRequireDefault(_isRequiredForA11y);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MenuItem = require('./MenuItem.react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Menu component that handles empty state when passed a set of results.
 */
var Menu = function (_React$Component) {
  _inherits(Menu, _React$Component);

  function Menu() {
    _classCallCheck(this, Menu);

    return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).apply(this, arguments));
  }

  _createClass(Menu, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          className = _props.className,
          emptyLabel = _props.emptyLabel,
          id = _props.id,
          innerRef = _props.innerRef,
          maxHeight = _props.maxHeight,
          style = _props.style;


      var contents = _react.Children.count(children) === 0 ? _react2.default.createElement(
        _MenuItem.BaseMenuItem,
        { disabled: true },
        emptyLabel
      ) : children;

      return _react2.default.createElement(
        'ul',
        {
          className: (0, _classnames2.default)('rbt-menu', 'dropdown-menu', 'show', className),
          id: id,
          ref: innerRef,
          role: 'listbox',
          style: _extends({}, style, {
            display: 'block',
            maxHeight: maxHeight,
            overflow: 'auto'
          }) },
        contents
      );
    }
  }]);

  return Menu;
}(_react2.default.Component);

Menu.propTypes = {
  /**
   * Needed for accessibility.
   */
  id: (0, _isRequiredForA11y2.default)(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])),
  /**
   * Maximum height of the dropdown menu.
   */
  maxHeight: _propTypes2.default.string
};

Menu.defaultProps = {
  maxHeight: '300px'
};

Menu.Divider = function (props) {
  return _react2.default.createElement('li', { className: 'divider dropdown-divider', role: 'separator' });
};

Menu.Header = function (props) {
  return _react2.default.createElement('li', _extends({}, props, { className: 'dropdown-header' }));
};

exports.default = Menu;