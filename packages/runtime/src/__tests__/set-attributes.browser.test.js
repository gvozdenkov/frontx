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
  it('should set className as an array of strings', async ({ props }) => {
    // Arrange
    var { parentEl } = props;
    var targetElLocator = page.getByTestId('parent');

    // Act
    setAttributes(parentEl, { className: ['one', 'two'] });

    // Assert
    await expect.element(targetElLocator).toHaveClass('one two');
  });
  // @ts-ignore - props type
  it('should set `style` for element', async ({ props }) => {
    // Arrange
    var { parentEl } = props;
    var targetElLocator = page.getByTestId('parent');

    var style = {
      backgroundColor: 'red',
      lineHeight: '1',
      color: '#fff',
      scale: '1',
      fontSize: '20px',
    };

    // Act
    setAttributes(parentEl, { style });

    // Assert
    await expect.element(targetElLocator).toHaveStyle(style);
  });
  // @ts-ignore - props type
  it('should set other html attributes for element', async ({ props }) => {
    // Arrange
    var { parentEl } = props;
    var targetElLocator = page.getByTestId('parent');

    // Act
    setAttributes(parentEl, { id: 'test-id', ariaLabel: 'aria label' });

    // Assert
    await expect.element(targetElLocator).toHaveAttribute('id', 'test-id');
    await expect.element(targetElLocator).toHaveAttribute('aria-label', 'aria label');
  });
});
