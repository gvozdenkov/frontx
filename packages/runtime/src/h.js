'use strict';

import { pipe } from './utils/pipe.js';

/**
 * @typedef {import('./types.js').HTMLTagName} HTMLTagName
 * @typedef {import('./types.js').HTMLAttributes} HTMLAttributes
 * @typedef {import('./types.js').HTMLEventHandlers} HTMLEventHandlers
 * @typedef {import('./types.js').VNode} VNode
 * @typedef {import('./types.js').VNodeType} VNodeType
 * @typedef {import('./types.js').TextVNode} TextVNode
 * @typedef {import('./types.js').ElementVNode} ElementVNode
 * @typedef {import('./types.js').FragmentVNode} FragmentVNode
 * @typedef {import('./types.js').ChildrenVNode} ChildrenVNode
 */

/**
 * Filter nulls form the array
 * @param {VNode[]} children - VNode or string (converted to text node)
 * @returns {VNode[]}
 */
var withoutNulls = (children) => children.filter((child) => child != null);

/**
 * Filter nulls form the array
 * @param {VNode[]} children - VNode or string (converted to text node)
 * @returns {VNode[]}
 */
var mapTextNode = (children) =>
  // @ts-ignore: return type always VNode, not a string
  children.map((child) => (child.constructor === String ? hText(child) : child));

var prepareChildren = pipe(withoutNulls, mapTextNode);

/**
 * Create Element vNode
 * @param {HTMLTagName} tag - HTML tag name
 * @param {Object} [options] - Options for the element.
 * @param {HTMLAttributes} [options.props={}] - HTML element Attributes
 * @param {HTMLEventHandlers} [options.on={}] - Event handlers for the HTML element.
 * @param {ChildrenVNode[]} [children=[]] - Array of child nodes, default empty array []
 * @returns {ElementVNode}
 */
export var h = (tag, options, children) => ({
  type: 'element',
  tag,
  props: options?.props ?? {},
  on: options?.on ?? {},
  children: (children?.length && prepareChildren(children)) ?? [],
});

/**
 * Crete Text vNode
 *
 * @param {string} value
 * @returns {TextVNode}
 */
export var hText = (value) => ({
  type: 'text',
  value: value ?? '',
  el: undefined,
});

/**
 * Create Fragment vNode
 * @param {ChildrenVNode[]} children - array of VNode or/and string
 * @returns {FragmentVNode}
 */
export var hFrag = (children) => ({
  type: 'fragment',
  children: (children?.length && prepareChildren(children)) ?? [],
  el: undefined,
});
