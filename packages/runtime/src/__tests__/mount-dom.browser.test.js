import { describe, it, expect } from 'vitest';
import { page } from '@vitest/browser/context';

import { mountDOM } from '../mount-dom.js';
import { h, hFrag, hText } from '../h.js';

describe('`mountDOM` function', () => {
  // @ts-ignore - props only
  it.skip('sould mount element node to parent element', async ({ props }) => {
    // Arrange
    var { parentEl, text1 } = props;
    var vDom = h('p', { props: { className: 'par', id: 'p-id', ariaLabel: 'my paragraph' } }, [
      text1,
    ]);

    // Act
    mountDOM(vDom, parentEl);

    // Assert
    await expect.element(page.getByText(text1)).toBeInTheDocument();
  });

  // @ts-ignore - props only
  it('sould mount text node to parent element', async ({ props }) => {
    // Arrange
    var { parentEl, text1 } = props;
    var vDom = hText(text1);

    // Act
    mountDOM(vDom, parentEl);

    // Assert
    await expect.element(page.getByText(text1)).toBeInTheDocument();
  });

  // @ts-ignore - props only
  it('sould mount fragment node to parent element', async ({ props }) => {
    // Arrange
    var { parentEl, text1, text2 } = props;

    var vDom = hFrag([h('p', {}, [text1]), h('p', {}, [text2])]);

    // Act
    mountDOM(vDom, parentEl);

    // Assert
    await expect.element(page.getByText(text1)).toBeInTheDocument();
    await expect.element(page.getByText(text2)).toBeInTheDocument();
    expect(parentEl.childNodes.length).toBe(2);
  });
});
