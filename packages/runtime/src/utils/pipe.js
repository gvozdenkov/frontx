/**
 * Pipe functions
 *
 * @param {any} fns
 * @returns {(x: any) => any}
 */
export var pipe =
  (...fns) =>
  (x) =>
    fns.reduce((/** @type {any} */ v, /** @type {any} */ f) => f(v), x);
