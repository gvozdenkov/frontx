/// <reference types="@vitest/browser/context" />
/// <reference types="@vitest/browser/providers/playwright" />

import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  {
    test: {
      include: ['src/__tests__/*.browser.test.js'],
      name: 'browser',
      browser: {
        enabled: true,
        provider: 'playwright',
        headless: true,
        instances: [
          {
            browser: 'chromium',
            setupFiles: './chromium-setup.mjs',
          },
        ],
      },
      setupFiles: './vitest.setup.js',
      reporters: 'verbose',
    },
  },
  {
    test: {
      include: ['src/__tests__/*node.test.js'],
      name: 'node',
      reporters: 'verbose',
      environment: 'node',
    },
  },
]);
