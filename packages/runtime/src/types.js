/**
 * Represents all valid HTML tag names
 *
 * @typedef {keyof HTMLElementTagNameMap} HTMLTagName
 */

/**
 * Represents an object containing valid event handlers for an HTML element.
 *
 * @typedef {{ [K in keyof HTMLElementEventMap]?: (event: HTMLElementEventMap[K]) => void }} HTMLEventHandlers
 */

/**
 * Represents valid HTML attributes for a specific HTML tag.
 *
 * @typedef {Partial<HTMLElementTagNameMap[HTMLTagName]>} HTMLAttributes
 */

/**
 * Valid types of a vNode
 * @typedef {'text' | 'element' | 'fragment'} VNodeType
 */

/**
 * Represents a node in the virtual DOM. It can be a TextNode, ElementNode, or FragmentNode.
 * @typedef {TextVNode | ElementVNode | FragmentVNode} VNode
 */

/**
 * Defines the structure of a Text vNode
 * @typedef {Object} TextVNode
 * @property {'text'} type - The type of the virtual node = 'text'.
 * @property {string} value - The text of the text node.
 * @property {Text} [el] - The mounted element.
 */

/**
 * @typedef {Object} ElementVNode
 * @property {'element'} type - The type of the virtual node = 'element'.
 * @property {HTMLTagName} tag - A valid HTML tag name.
 * @property {HTMLAttributes | {}} [props] - An object representing valid HTML attributes
 * @property {HTMLEventHandlers} [on] - Object containing event handlers for the HTML element
 * @property {VNode[]} children - VNode or string (converted to text node)
 * @property {HTMLElement} [el] - The mounted element
 */

/**
 * Defines the structure of a Fragment vNode
 * @typedef {Object} FragmentVNode
 * @property {'fragment'} type - The type of the virtual node = 'fragment'.
 * @property {VNode[]} children - The text of the text node.
 * @property {Text} [el] - The mounted element.
 */

/**
 * Represents a type of childeren array.
 * @typedef {VNode | string | null | undefined} ChildrenVNode
 */

export {};
