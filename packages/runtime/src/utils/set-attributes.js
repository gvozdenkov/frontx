/**
 * @typedef {import('../types.js').HTMLAttributes} HTMLAttributes
 */

/**
 * Set html className, style and other attributes to HTMLElement
 *
 * @param {HTMLElement} elementNode
 * @param {HTMLAttributes} attrs
 */
export var setAttributes = (elementNode, attrs) => {
  var { className, style, ...otherAttr } = attrs;

  className && elementNode.setAttribute('class', className);
};
