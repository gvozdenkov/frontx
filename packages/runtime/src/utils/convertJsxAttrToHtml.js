/**
 * Maps JSX/React attribute names to their HTML counterparts
 * @typedef {Object.<string, string>} AttributeMap
 */

/**
 * Converts JSX/React attribute names to their HTML equivalents
 * @param {string} attrName - The JSX attribute name to convert
 * @returns {string} The HTML attribute name
 */
export var convertJsxAttrToHtml = (attrName) => {
  /**@type  {AttributeMap} */
  var attrMap = {
    className: 'class',
    htmlFor: 'for',
    tabIndex: 'tabindex',
    readOnly: 'readonly',
  };

  return attrMap[attrName]
    ? attrMap[attrName]
    : /^on[A-Z]/.test(attrName)
      ? attrName.toLowerCase()
      : attrName.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
};
