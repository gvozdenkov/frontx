'use strict';

/**
 * @typedef {import('./types.js').HTMLTagName} HTMLTagName
 * @typedef {import('./types.js').VNode} VNode
 * @typedef {import('./types.js').TextVNode} TextVNode
 * @typedef {import('./types.js').ElementVNode} ElementVNode
 * @typedef {import('./types.js').FragmentVNode} FragmentVNode
 * @typedef {import('./types.js').VNodeType} VNodeType
 */

/**
 * @callback CreateNodeFunction
 * @param {VNode} vNode
 * @param {HTMLElement} parentEl
 * @returns {void}
 */

/**
 * Mount virtual DOM to HTML parent element
 *
 * @param {VNode} vNode
 * @param {HTMLElement} parentEl
 */
export var mountDOM = (vNode, parentEl) => {
  /**
   * Attach fragment nodes to parentEl
   * @type {CreateNodeFunction}
   */
  var createTextNode = (vNode, parentEl) => {
    // @ts-ignore: for TextVNode vNode.value always exists
    var textNode = document.createTextNode(vNode.value);
    vNode.el = textNode;
    parentEl.append(textNode);
  };

  /**
   * Attach fragment nodes to parentEl
   * @type {CreateNodeFunction}
   */
  var createFragmentNode = (vNode, parentEl) => {
    vNode.el = parentEl;
    // @ts-ignore: for FragmentVNode children always exists
    vNode?.children?.map((/** @type {VNode} */ vNode) => mountDOM(vNode, parentEl));
  };

  /**
   * Create element node and attach to parentEl
   * @type {CreateNodeFunction}
   */
  var createElementNode = (vNode, parentEl) => {
    // @ts-ignore: for ElementVNode vNode.tag always exists
    var elementNode = document.createElement(vNode.tag);
    vNode.el = elementNode;
    // @ts-ignore: for ElementVNode children always exists
    vNode?.children?.map((/** @type {VNode} */ vNode) => mountDOM(vNode, elementNode));
    parentEl.append(elementNode);
  };

  var renderNode = {
    text: createTextNode,
    element: createElementNode,
    fragment: createFragmentNode,
  };

  !Object.keys(renderNode).includes(vNode.type) &&
    new Error(`Can't mount DOM of type: ${vNode.type}`);

  return renderNode[vNode.type](vNode, parentEl);
};
