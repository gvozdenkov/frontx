import { describe, it, expect } from 'vitest';
import { jsxAttrNameToHtml } from '../utils/convertJsxToHtml.js';

describe('jsxAttrNameToHtml', () => {
  it('maps known JSX attributes', () => {
    expect(jsxAttrNameToHtml('className')).toBe('class');
    expect(jsxAttrNameToHtml('htmlFor')).toBe('for');
    expect(jsxAttrNameToHtml('tabIndex')).toBe('tabindex');
    expect(jsxAttrNameToHtml('readOnly')).toBe('readonly');
  });

  it('converts event handlers to lowercase', () => {
    expect(jsxAttrNameToHtml('onClick')).toBe('onclick');
    expect(jsxAttrNameToHtml('onMouseEnter')).toBe('onmouseenter');
    expect(jsxAttrNameToHtml('onFocus')).toBe('onfocus');
  });

  it('converts camelCase to kebab-case for other attributes', () => {
    expect(jsxAttrNameToHtml('dataTestId')).toBe('data-test-id');
    expect(jsxAttrNameToHtml('ariaLabel')).toBe('aria-label');
  });

  it('leaves already kebab-case or lowercase attributes as is', () => {
    expect(jsxAttrNameToHtml('placeholder')).toBe('placeholder');
    expect(jsxAttrNameToHtml('id')).toBe('id');
  });

  it('returns attribute with hyphens for multiple uppercase letters', () => {
    expect(jsxAttrNameToHtml('myCustomAttr')).toBe('my-custom-attr');
    expect(jsxAttrNameToHtml('anotherAttrHere')).toBe('another-attr-here');
  });
});
