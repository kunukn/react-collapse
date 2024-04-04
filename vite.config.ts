import { extname, relative, resolve } from 'path'

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { fileURLToPath } from 'node:url'
import { glob } from 'glob'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import pkg from './package.json'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), libInjectCss(), dts({ include: ['lib'] })],
  build: {
    copyPublicDir: true,
    lib: {
      entry: resolve(__dirname, 'lib/Collapse.tsx'),
      name: 'Collapse',
    },
    sourcemap: true,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      input: resolve(__dirname, 'lib/Collapse.tsx'),
      plugins: [],
      output: [
        {
          //file: 'dist/Collapse.es.js',
          dir: 'dist',
          entryFileNames: '[name].es.js',
          format: 'es',
        },
        {
          dir: 'dist',
          entryFileNames: '[name].umd.js',
          format: 'umd',
          name: 'Collapse',
          externalLiveBindings: false,
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
      ],
    },
  },
})
