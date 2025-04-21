import { afterEach, beforeAll, beforeEach } from 'vitest';

// Attach to context so each test can access it via param
beforeEach((context) => {
  var parentEl = document.createElement('section');
  parentEl.setAttribute('data-testid', 'parent')
  document.body.append(parentEl);
  context.props = {
    parentEl,
    text1: 'lorem ipsum',
    text2: 'dolor sit',
    text3: 'amet',
  };
});

afterEach(() => {
  var parentEl = document.querySelector('section');
  parentEl.remove();
});
