'use strict';
/**
 * @namespace HTML
 */

/**
 * Represents all valid and not deprecated HTML tag names.
 *
 * @typedef {'a' | 'b' | 'div' | 'span' | 'img' | 'button' | 'input' |
 * 'textarea' | 'form' | 'header' | 'footer' | 'main' | 'article' |
 * 'section' | 'nav' | 'aside' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' |
 * 'h6' | 'ul' | 'ol' | 'li' | 'table' | 'thead' | 'tbody' | 'tfoot' |
 * 'tr' | 'th' | 'td' | 'p' | 'blockquote' | 'pre' | 'code' | 'canvas' |
 * 'video' | 'audio' | 'svg' | 'path'} HTML.TagName
 */

/**
 * Represents a set of valid attributes for any HTML tag.
 *
 * @typedef {Object} HTML.Attributes
 * @property {string} [id] - The `id` attribute, used to specify a unique identifier for the element.
 * @property {string} [class] - The `class` attribute, used to apply CSS classes.
 * @property {string} [style] - The `style` attribute, for inline CSS styles.
 * @property {boolean} [hidden] - The `hidden` attribute, to hide the element.
 * @property {string} [title] - The `title` attribute, for additional information (often shown as a tooltip).
 * @property {string} [lang] - The `lang` attribute, specifying the language of the element's content.
 * @property {string} [role] - The `role` attribute, defining ARIA roles for accessibility.
 * @property {boolean} [draggable] - The `draggable` attribute, enabling drag-and-drop features.
 * @property {string} [data] - Custom `data-*` attributes for storing custom data.
 */

/**
 * Represents the attributes for specific HTML tags.
 *
 * @typedef {Object} HTML.TagAttributes
 * @property {HTML.Attributes & { href?: string, target?: string }} a - Attributes for the `<a>` tag.
 * @property {HTML.Attributes & { src?: string, alt?: string, width?: number, height?: number }} img - Attributes for the `<img>` tag.
 * @property {HTML.Attributes & { disabled?: boolean, value?: string, type?: string }} input - Attributes for the `<input>` tag.
 * @property {HTML.Attributes & { rows?: number, cols?: number, maxlength?: number, minlength?: number }} textarea - Attributes for the `<textarea>` tag.
 * @property {HTML.Attributes & { action?: string, method?: "get" | "post" }} form - Attributes for the `<form>` tag.
 */

/**
 * Represents an object with event handlers.
 *
 * @typedef {Object} EventHandlers
 * @property {Function} [click] - A function to be executed when the `click` event is triggered.
 * @property {Function} [dblclick] - A function to be executed when the `double click` event is triggered.
 * @property {Function} [input] - A function to be executed when the `input` event is triggered.
 */

/**
 * Represents an object containing event bindings.
 *
 * @typedef {Object} EventBinding
 * @property {EventHandlers} on - An object containing event handler functions.
 */

/**
 * A union type for all possible HTML attributes and Events across tags.
 *
 * @typedef {HTML.Attributes | HTML.TagAttributes | EventBinding} HTML.AllAttributes
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
 * @typedef {{ type: 'text', value: string }} Vdom.TextNode
 */

/**
 * Defines the structure of a Element vNode
 * @typedef {{ type: 'element', tag: HTML.TagName, props?: HTML.AllAttributes, children?: Vdom.Node[] }} Vdom.ElementNode
 */

/**
 * Defines the structure of a Fragment vNode
 * @typedef {{ type: 'fragment', children?: Vdom.Node[] }} Vdom.FragmentNode
 */

/**
 * Represents a node in the virtual DOM. It can be a TextNode, ElementNode, or FragmentNode.
 * @typedef {Vdom.TextNode | Vdom.ElementNode | Vdom.FragmentNode} Vdom.Node
 */

/**
 * Filter nulls form the array
 *
 * @param {Vdom.Node[]} vNodes
 * @returns {Vdom.Node[]}
 */
var withoutNulls = (vNodes) => vNodes.filter((vNode) => vNode != null);

/**
 * Filter nulls form the array
 *
 * @param {Vdom.Node[]} vNodes
 * @returns {Vdom.Node[]}
 */
var mapTextNode = (vNodes) =>
  vNodes.map((vNode) => (vNode.constructor === String ? hText(vNode) : vNode));

/**
 * Create Element vNode
 *
 * @param {HTML.TagName} tag - HTML tag name
 * @param {HTML.AllAttributes} [props={}] - HTML tag props, default empty object {}
 * @param {Vdom.Node[]} [children=[]] - Array of child nodes, default empty array []
 * @returns {Vdom.ElementNode}
 */
export var h = (tag, props, children) => ({
  type: 'element',
  tag,
  props: props ?? {},
  children: children?.length ? mapTextNode(withoutNulls(children)) : [],
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
 *
 * @param {Vdom.Node[]} vNodes
 * @returns {Vdom.FragmentNode}
 */
export var hFrag = (vNodes) => ({
  type: 'fragment',
  children: vNodes?.length ? mapTextNode(withoutNulls(vNodes)) : [],
});
