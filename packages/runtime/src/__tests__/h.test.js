import { describe, it, expect } from 'vitest';
import { h, hFrag, hText } from '../h.js';

describe('`h` function', () => {
  it('should use default params for props & children', () => {
    var res = h('div');

    expect(res).toEqual({
      type: 'element',
      tag: 'div',
      props: {},
      on: {},
      children: [],
    });
  });
  it('should work with fragment', () => {
    var res = hFrag(['text', h('p', {}, ['p text'])]);

    expect(res).toEqual({
      type: 'fragment',
      children: [
        {
          type: 'text',
          value: 'text',
        },
        {
          type: 'element',
          tag: 'p',
          props: {},
          on: {},
          children: [
            {
              type: 'text',
              value: 'p text',
            },
          ],
        },
      ],
    });
  });
  it('should return an object with tag, props & complex children', () => {
    var click = () => console.log('Clicked');

    var res = h(
      'button',
      {
        props: { className: 'btn', ariaLabel: 'aria', id: 'btn-id' },
        on: { click },
      },
      ['hello', h('span', { props: { className: 'span' } }, ['span text'])],
    );

    expect(res).toEqual({
      type: 'element',
      tag: 'button',
      props: {
        className: 'btn',
        ariaLabel: 'aria',
        id: 'btn-id',
      },
      on: {
        click,
      },
      children: [
        {
          type: 'text',
          value: 'hello',
        },
        {
          type: 'element',
          tag: 'span',
          props: {
            className: 'span',
          },
          on: {},
          children: [
            {
              type: 'text',
              value: 'span text',
            },
          ],
        },
      ],
    });
  });
});
