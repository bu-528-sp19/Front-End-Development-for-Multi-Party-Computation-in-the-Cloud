"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isShown;
function isShown(results, props) {
  var emptyLabel = props.emptyLabel,
      minLength = props.minLength,
      showMenu = props.showMenu,
      text = props.text;


  if (!showMenu) {
    return false;
  }

  if (text.length < minLength) {
    return false;
  }

  return !!(results.length || emptyLabel);
}