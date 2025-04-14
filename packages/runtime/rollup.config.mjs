import cleanup from 'rollup-plugin-cleanup';
import filesize from 'rollup-plugin-filesize';
import terser from '@rollup/plugin-terser';
import { dts } from 'rollup-plugin-dts';

export default [
  // Step 1: Bundle JavaScript files
  {
    input: 'src/index.js',
    plugins: [cleanup()],
    output: [
      {
        file: 'dist/rock-frontend.js',
        format: 'esm',
        plugins: [filesize(), terser()],
      },
    ],
  },
  // Step2: Bundle d.ts files
  {
    input: 'dist/dts/index.d.ts',
    output: [
      {
        file: 'dist/rock-frontend.d.ts',
        format: 'esm',
      },
    ],
    plugins: [dts()],
  },
];
