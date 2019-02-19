'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _getStringLabelKey = require('./getStringLabelKey');

var _getStringLabelKey2 = _interopRequireDefault(_getStringLabelKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Retrieves the display string from an option. Options can be the string
 * themselves, or an object with a defined display string. Anything else throws
 * an error.
 */
function getOptionLabel(option, labelKey) {
  if (option.paginationOption || option.customOption) {
    return option[(0, _getStringLabelKey2.default)(labelKey)];
  }

  var optionLabel = void 0;

  if (typeof option === 'string') {
    optionLabel = option;
  }

  if (typeof labelKey === 'function') {
    // This overwrites string options, but we assume the consumer wants to do
    // something custom if `labelKey` is a function.
    optionLabel = labelKey(option);
  } else if (typeof labelKey === 'string' && (0, _isPlainObject2.default)(option)) {
    optionLabel = option[labelKey];
  }

  !(typeof optionLabel === 'string') ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'One or more options does not have a valid label string. Check the ' + '`labelKey` prop to ensure that it matches the correct option key and ' + 'provides a string for filtering and display.') : (0, _invariant2.default)(false) : void 0;

  return optionLabel;
}

exports.default = getOptionLabel;