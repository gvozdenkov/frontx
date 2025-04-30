import { describe, it, expect } from 'vitest';
import { convertJsxAttrToHtml } from '../utils/convertJsxAttrToHtml.js';

describe('convertJsxAttrToHtml', () => {
  it('maps known JSX attributes', () => {
    expect(convertJsxAttrToHtml('className')).toBe('class');
    expect(convertJsxAttrToHtml('htmlFor')).toBe('for');
    expect(convertJsxAttrToHtml('tabIndex')).toBe('tabindex');
    expect(convertJsxAttrToHtml('readOnly')).toBe('readonly');
  });

  it('converts event handlers to lowercase', () => {
    expect(convertJsxAttrToHtml('onClick')).toBe('onclick');
    expect(convertJsxAttrToHtml('onMouseEnter')).toBe('onmouseenter');
    expect(convertJsxAttrToHtml('onFocus')).toBe('onfocus');
  });

  it('converts camelCase to kebab-case for other attributes', () => {
    expect(convertJsxAttrToHtml('dataTestId')).toBe('data-test-id');
    expect(convertJsxAttrToHtml('ariaLabel')).toBe('aria-label');
  });

  it('leaves already kebab-case or lowercase attributes as is', () => {
    expect(convertJsxAttrToHtml('placeholder')).toBe('placeholder');
    expect(convertJsxAttrToHtml('id')).toBe('id');
  });

  it('returns attribute with hyphens for multiple uppercase letters', () => {
    expect(convertJsxAttrToHtml('myCustomAttr')).toBe('my-custom-attr');
    expect(convertJsxAttrToHtml('anotherAttrHere')).toBe('another-attr-here');
  });
});
