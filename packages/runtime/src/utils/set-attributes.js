/**
 * @typedef {import('../types.js').HTMLAttributes} HTMLAttributes
 */

import { jsxAttrNameToHtml } from './convertJsxToHtml.js';

/**
 * Set html className, style and other attributes to HTMLElement
 *
 * @param {HTMLElement} elementNode
 * @param {HTMLAttributes} attrs
 */
export var setAttributes = (elementNode, attrs) => {
  var { className, style, ...otherAttr } = attrs;

  var isArray = className?.constructor === Array;

  // @ts-ignore - if className is array join is valid method
  className && elementNode.setAttribute('class', isArray ? className.join(' ') : className);

  style &&
    Object.entries(style).forEach(([name, value]) =>
      elementNode.style.setProperty(jsxAttrNameToHtml(name), value ?? null),
    );

  otherAttr &&
    Object.entries(otherAttr).forEach(([attr, value]) =>
      elementNode.setAttribute(jsxAttrNameToHtml(attr), value),
    );
};
