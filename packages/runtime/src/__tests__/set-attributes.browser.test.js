import { describe, it, expect } from 'vitest';
import { page } from '@vitest/browser/context';

import { setAttributes } from '../utils/set-attributes.js';

describe('`setAttributes` function', () => {
  // @ts-ignore - props type
  it('should set className as a string', async ({ props }) => {
    // Arrange
    var { parentEl } = props;
    var targetElLocator = page.getByTestId('parent');

    // Act
    setAttributes(parentEl, { className: 'one two' });

    // Assert
    await expect.element(targetElLocator).toHaveClass('one two');
  });
  // @ts-ignore - props type
  it.only('should set `style` for element', async ({ props }) => {
    // Arrange
    var { parentEl } = props;
    var targetElLocator = page.getByTestId('parent');

    // Act
    setAttributes(parentEl, {   });

    // Assert
    // await expect.element(targetElLocator).toHaveClass('one two');
  });
});
