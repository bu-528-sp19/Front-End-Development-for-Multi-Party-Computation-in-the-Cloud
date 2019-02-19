'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getStringLabelKey;

var _defaultLabelKey = require('../constants/defaultLabelKey');

function getStringLabelKey(labelKey) {
  return typeof labelKey === 'string' ? labelKey : _defaultLabelKey.DEFAULT_LABELKEY;
}