'use strict';

import { pipe } from './utils/pipe';

/**
 * @namespace HTML
 */

/**
 * Represents all valid HTML tag names
 *
 * @typedef {keyof HTMLElementTagNameMap} HTML.TagName
 */

/**
 * Represents an object containing valid event handlers for an HTML element.
 *
 * @typedef {{ [K in keyof HTMLElementEventMap]?: (event: HTMLElementEventMap[K]) => void }} HTML.EventHandlers
 */

/**
 * Represents valid HTML attributes for a specific HTML tag.
 *
 * @template T
 * @typedef {T extends HTML.TagName ? Partial<HTMLElementTagNameMap[T]> : never} HTML.Attributes
 */

/**
 * Operations for Vdom.
 *
 * @namespace Vdom
 */

/**
 * Valid types of a vNode
 * @typedef {'text' | 'element' | 'fragment'} Vdom.NodeType
 */

/**
 * Defines the structure of a Text vNode
 * @typedef {{ type: Vdom.NodeType, value: string }} Vdom.TextNode
 */

/**
 * @template {HTML.TagName} T
 * @typedef {Object} Vdom.ElementNode
 * @property {Vdom.NodeType} type - vNode type 'text', 'element', 'fragment'
 * @property {T} [tag] - A valid HTML tag name.
 * @property {HTML.Attributes<T> | {}} [props] - An object representing valid HTML attributes
 * @property {HTML.EventHandlers} [on] - Object containing event handlers for the HTML element
 * @property {Vdom.Children<T>[]} [children] - Vdom.Node or string (converted to text node)
 */

/**
 * Defines the structure of a Fragment vNode
 * @template {HTML.TagName} T
 * @typedef {{ type: Vdom.NodeType, children?: Vdom.Children<T>[] }} Vdom.FragmentNode
 */

/**
 * Represents a node in the virtual DOM. It can be a TextNode, ElementNode, or FragmentNode.
 * @template {HTML.TagName} T
 * @typedef {Vdom.TextNode | Vdom.ElementNode<T> | Vdom.FragmentNode<T>} Vdom.Node
 */

/**
 * Represents a type of childeren array.
 * @template {HTML.TagName} T
 * @typedef {string | Vdom.Node<T>} Vdom.Children
 */

/**
 * Filter nulls form the array
 * @template {HTML.TagName} T
 * @param {Vdom.Children<T>[]} children - Vdom.Node or string (converted to text node)
 * @returns {Vdom.Children<T>[]}
 */
var withoutNulls = (children) => children.filter((child) => child != null);

/**
 * Filter nulls form the array
 * @template {HTML.TagName} T
 * @param {Vdom.Children<T>[]} children - Vdom.Node or string (converted to text node)
 * @returns {Vdom.Node<T>[]}
 */
var mapTextNode = (children) =>
  // @ts-ignore: return type always Vdom.Node, not a string
  children.map((child) => (child.constructor === String ? hText(child) : child));

var prepareChildren = pipe(mapTextNode, withoutNulls);

/**
 * Create Element vNode
 * @template {HTML.TagName} T
 * @param {T} tag - HTML tag name
 * @param {Object} [options] - Options for the element.
 * @param {HTML.Attributes<T>} [options.props={}] - HTML element Attributes
 * @param {HTML.EventHandlers} [options.on={}] - Event handlers for the HTML element.
 * @param {Vdom.Children<T>[]} [children=[]] - Array of child nodes, default empty array []
 * @returns {Vdom.ElementNode<T>}
 */
export var h = (tag, options, children) => ({
  type: 'element',
  tag,
  props: options?.props ?? {},
  on: options?.on ?? {},
  children: children?.length ? prepareChildren(children) : [],
});

/**
 * Crete Text vNode
 *
 * @param {string} value
 * @returns {Vdom.TextNode}
 */
export var hText = (value) => ({
  type: 'text',
  value,
});

/**
 * Create Fragment vNode
 * @template {HTML.TagName} T
 * @param {Vdom.Children<T>[]} vNodes
 * @returns {Vdom.FragmentNode<T>}
 */
export var hFrag = (vNodes) => ({
  type: 'fragment',
  children: vNodes?.length ? mapTextNode(withoutNulls(vNodes)) : [],
});
